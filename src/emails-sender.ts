// TODO: Mails sender serverless
import { type Context, type SQSBatchResponse, type SQSEvent } from "aws-lambda";

import { logger } from "@/providers/logger";

export const handler = async (event: SQSEvent, context: Context) => {
  const failures: string[] = [];

  logger.info(`Received event with ${event.Records.length} records.`);

  for await (const record of event.Records) {
    /**
     * Process event
     */
    logger.info({ message: "Processing record", record });
  }

  if (failures.length) {
    const batchFailure: SQSBatchResponse = {
      batchItemFailures: failures.map((id) => ({ itemIdentifier: id })),
    };
    logger.error(`FAILING messages: ${JSON.stringify(batchFailure)}`);

    return batchFailure;
  }
};
