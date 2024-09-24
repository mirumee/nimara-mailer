import { type FastifyInstance } from "fastify";

import { SaleorAWSSecretsManagerConfigProvider } from "@/lib/saleor/config/AWSsecretsManager";

export const getConfigProvider = ({ server }: { server: FastifyInstance }) =>
  SaleorAWSSecretsManagerConfigProvider({
    secretsManagerConfigPath: server.secretsManagerConfigPath,
    secretsManager: server.secretsManager,
    logger: server.log,
  });
