import {
  type Context,
  type SQSBatchResponse,
  type SQSEvent,
  type SQSRecord,
} from "aws-lambda";

import { CONFIG } from "@/config";
import { TEMPLATES_MAP } from "@/lib/emails/const";
import { EmailParsePayloadError } from "@/lib/emails/errors";
import { type SerializedPayload } from "@/lib/emails/events/helpers";
import { getJSONFormatHeader } from "@/lib/saleor/apps/utils";
import { getEmailProvider } from "@/providers/email";
import { getLogger } from "@/providers/logger";

export const logger = getLogger("emails-sender");

const parseRecord = (record: SQSRecord) => {
  try {
    // FIXME: Proxy events has invalid format? Test with real data.
    const data = JSON.parse((record as any).Body);
    return data as SerializedPayload;
  } catch (error) {
    logger.error("Failed to parse record payload.", { record, error });

    throw new EmailParsePayloadError("Failed to parse record payload.", {
      cause: { source: error as Error },
    });
  }
};

export const handler = async (event: SQSEvent, context: Context) => {
  const failures: string[] = [];

  logger.info(`Received event with ${event.Records.length} records.`);

  for await (const record of event.Records) {
    logger.debug("Processing record", { record });

    const {
      format,
      payload: { data, event },
    } = parseRecord(record);

    if (format === getJSONFormatHeader({ version: 1, name: CONFIG.NAME })) {
      const match = TEMPLATES_MAP[event];

      if (!match) {
        return logger.warn("Received payload with unhandled template.", {
          format,
          data,
          event,
        });
      }

      const { extractFn, template } = match;
      const toEmail = extractFn(data);
      const fromEmail = CONFIG.FROM_EMAIL;
      const from = CONFIG.FROM_NAME;

      const sender = getEmailProvider({
        fromEmail,
        from,
        toEmail,
      });

      const html = await sender.render({
        props: { data },
        template,
      });
      // TODO: Handle properly
      // Will throw TypeError if failed to render / non transient

      await sender.send({
        html,
        subject: template.Subject,
      });

      logger.info("Email sent successfully.", { toEmail, event });
    } else {
      return logger.warn("Received payload with unsupported format.", {
        format,
        data,
        event,
      });
    }
  }

  if (failures.length) {
    const batchFailure: SQSBatchResponse = {
      batchItemFailures: failures.map((id) => ({ itemIdentifier: id })),
    };
    logger.error(`FAILING messages: ${JSON.stringify(batchFailure)}`);

    return batchFailure;
  }
};
