import { type Context, type SQSEvent, type SQSRecord } from "aws-lambda";
import { Consumer } from "sqs-consumer";

import { CONFIG } from "@/config";
import { handler, logger } from "@/emails-sender";

const app = Consumer.create({
  queueUrl: CONFIG.SQS_QUEUE_URL,
  handleMessageBatch: async (messages) => {
    const event: SQSEvent = {
      Records: messages as SQSRecord[],
    };
    const context = {} as Context;
    const callback = () => null;

    return await handler(event, context, () => callback);
  },
});

app.on("error", (error) => {
  logger.error(`Proxy error: ${error.message}`, { error, stack: error.stack });
});

app.on("processing_error", (error) => {
  logger.error(`Proxy processing error: ${error.message}`, {
    error,
    stack: error.stack,
  });
});

app.on("started", () => {
  logger.info("SQS consumer started and listening for events.", {
    queueUrl: CONFIG.SQS_QUEUE_URL,
  });
});

app.start();
