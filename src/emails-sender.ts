// TODO: Mails sender serverless
import { type Context, type SQSBatchResponse, type SQSEvent } from "aws-lambda";

export const handler = async (event: SQSEvent, context: Context) => {
  const failures = [];

  for await (const record of event.Records) {
    /**
     * Process event
     */
    console.log("Processing record: ", record);
    console.log(
      `Received messageId: ${record.messageId} with body: ${record.body}`
    );
    failures.push(record.messageId);
  }

  if (failures.length) {
    const batchFailure: SQSBatchResponse = {
      batchItemFailures: failures.map((id) => ({ itemIdentifier: id })),
    };
    console.log(`FAILING messages: ${JSON.stringify(batchFailure)}`);

    return batchFailure;
  }
};
