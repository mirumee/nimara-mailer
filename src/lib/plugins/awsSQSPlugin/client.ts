import { SQSClient } from "@aws-sdk/client-sqs";

/**
 * Envs are injected automatically by @aws-sdk - no need to pass them explicitly.
 */
export const sqsClient = new SQSClient();
