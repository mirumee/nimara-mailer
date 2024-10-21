import "./instrument.emails-sender";

import * as Sentry from "@sentry/aws-serverless";
import {
  type Callback,
  type Context,
  type SQSBatchItemFailure,
  type SQSBatchResponse,
  type SQSEvent,
} from "aws-lambda";

import { CONFIG } from "@/config";
import { TEMPLATES_MAP } from "@/lib/emails/const";
import { getJSONFormatHeader, parseRecord } from "@/lib/payload";
import { getEmailProvider } from "@/providers/email";
import { getLogger } from "@/providers/logger";

export const logger = getLogger();

export const handler = Sentry.wrapHandler(
  async (
    event: SQSEvent,
    context: Context,
    callback: Callback
  ): Promise<SQSBatchResponse> => {
    const batchItemFailures: SQSBatchItemFailure[] = [];

    logger.info(`Received event with ${event.Records.length} records.`);

    for await (const record of event.Records) {
      logger.debug("Processing record", { record });

      const {
        format,
        payload: { data, event },
      } = parseRecord(record);
      const supportedJSONFormat = getJSONFormatHeader({
        version: 1,
        name: CONFIG.NAME,
      });

      if (format === supportedJSONFormat) {
        const match = TEMPLATES_MAP[event];

        if (!match) {
          logger.warn("Received payload with unhandled template.", {
            format,
            data,
            event,
          });
          continue;
        }

        const { extractFn, template } = match;
        const toEmail = extractFn(data);
        const fromEmail = CONFIG.FROM_EMAIL;
        const from = CONFIG.FROM_NAME;

        const emailProvider = await getEmailProvider();
        const sender = emailProvider({
          fromEmail,
          from,
          toEmail,
          logger,
        });

        const html = await sender.render({
          props: { data },
          template,
        });

        await sender.send({
          html,
          subject: template.Subject,
        });

        logger.info("Email sent successfully.", { toEmail, event });
      } else {
        logger.warn("Received payload with unsupported format.", {
          format,
          data,
          event,
        });
        continue;
      }
    }

    if (batchItemFailures.length) {
      const failedMessagesId = batchItemFailures.map(
        ({ itemIdentifier }) => itemIdentifier
      );
      logger.error(`Failed messages: ${failedMessagesId.join(", ")}.`);
    }

    return { batchItemFailures };
  }
);
