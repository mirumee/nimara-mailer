import { type FastifyInstance } from "fastify";

import { SaleorSecretsManagerConfigProvider } from "@/lib/saleor/config/secretsManager";

export const getConfigProvider = ({ server }: { server: FastifyInstance }) =>
  SaleorSecretsManagerConfigProvider({
    secretsManagerConfigPath: server.secretsManagerConfigPath,
    secretsManager: server.secretsManager,
    logger: server.log,
  });
