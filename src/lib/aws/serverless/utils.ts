import { type SQSRecord } from "aws-lambda";

import { EmailParsePayloadError } from "@/lib/emails/errors";
import { type SerializedPayload } from "@/lib/emails/events/helpers";
import { getLogger } from "@/providers/logger";

const logger = getLogger();

export const parseRecord = (record: SQSRecord) => {
  try {
    // Proxy events has invalid types.
    const data = JSON.parse((record as any).Body);

    return data as SerializedPayload;
  } catch (error) {
    logger.error("Failed to parse record payload.", { record, error });

    // TODO: Should be non transient error
    throw new EmailParsePayloadError("Failed to parse record payload.", {
      cause: { source: error as Error },
    });
  }
};
