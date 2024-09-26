// TODO: Mails sender serverless
import { type Context, type SQSBatchResponse, type SQSEvent } from "aws-lambda";

import { CONFIG } from "@/config";
import { getEmailProvider } from "@/providers/email";
import { logger } from "@/providers/logger";

import { OrderCreatedEmail } from "./templates/OrderCreatedEmail";

export const handler = async (event: SQSEvent, context: Context) => {
  const failures: string[] = [];

  logger.info(`Received event with ${event.Records.length} records.`);

  for await (const record of event.Records) {
    /**
     * Process event
     */
    logger.info({ message: "Processing record", record });

    const sender = getEmailProvider({
      fromEmail: `piotr.grundas+${CONFIG.NAME}@mirumee.com`,
      from: CONFIG.RELEASE,
      toEmail: "piotr.grundas@mirumee.com",
    });

    const html = await sender.render({
      props: {},
      template: OrderCreatedEmail,
    });

    await sender.send({
      html,
      subject: "Order created",
    });
  }

  if (failures.length) {
    const batchFailure: SQSBatchResponse = {
      batchItemFailures: failures.map((id) => ({ itemIdentifier: id })),
    };
    logger.error(`FAILING messages: ${JSON.stringify(batchFailure)}`);

    return batchFailure;
  }
};
