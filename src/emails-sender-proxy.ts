import { SQSClient } from "@aws-sdk/client-sqs";
import { type Context, type SQSEvent, type SQSRecord } from "aws-lambda";
import { Consumer } from "sqs-consumer";

import { CONFIG } from "@/config";
import { handler, logger } from "@/emails-sender";

const app = Consumer.create({
  queueUrl: CONFIG.SQS_QUEUE_URL,
  sqs: new SQSClient({
    useQueueUrlAsEndpoint: false,
    endpoint: CONFIG.SQS_QUEUE_URL,
  }),
  handleMessageBatch: async (messages) => {
    const event: SQSEvent = {
      Records: messages as SQSRecord[],
    };
    const context = {} as Context;

    await handler(event, context);
  },
});

app.on("error", (error) => {
  logger.error("Proxy error.");
  logger.error(error.message);
});

app.on("processing_error", (error) => {
  logger.error("Proxy processing error.");
  logger.error(error.message);
});

app.on("started", () => {
  logger.info("SQS consumer started and listening for events.", {
    queueUrl: CONFIG.SQS_QUEUE_URL,
  });
});

app.start();
