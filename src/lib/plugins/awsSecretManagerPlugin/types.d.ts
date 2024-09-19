import { type FastifyInstance } from "fastify";
import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

declare module "fastify" {
  interface FastifyInstance {
    secretsManager: SecretsManagerClient;
    secretsManagerConfigPath: string;
  }
}
