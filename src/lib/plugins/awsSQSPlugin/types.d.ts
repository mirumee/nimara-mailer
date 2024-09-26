import { type FastifyInstance } from "fastify";
import { SQSClient } from "@aws-sdk/client-sqs";

declare module "fastify" {
  interface FastifyInstance {
    sqs: SQSClient;
  }
}
