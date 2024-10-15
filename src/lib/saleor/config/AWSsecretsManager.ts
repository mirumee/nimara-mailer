import {
  GetSecretValueCommand,
  PutSecretValueCommand,
  type SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { type FastifyBaseLogger } from "fastify";

import { saleorBaseConfig } from "./schema";
import {
  type SaleorConfigProvider,
  type SaleorConfigProviderFactory,
} from "./types";
import { validateDomain } from "./utils";

export type SaleorAWSSecretsManagerConfigProviderOpts = {
  logger: FastifyBaseLogger;
  secretsManager: SecretsManagerClient;
  secretsManagerConfigPath: string;
};

export const SaleorAWSSecretsManagerConfigProvider: SaleorConfigProviderFactory<
  SaleorAWSSecretsManagerConfigProviderOpts
> = ({ secretsManager, logger, secretsManagerConfigPath }) => {
  const _extractSecret = async () => {
    const command = new GetSecretValueCommand({
      SecretId: secretsManagerConfigPath,
    });
    let config = null;

    try {
      const response = await secretsManager.send(command);
      config = JSON.parse(response.SecretString ?? "");
    } catch (err) {
      logger.error(err);
      return config;
    }

    if (Object.entries(config).length) {
      try {
        return saleorBaseConfig.parse(config);
      } catch (err) {
        logger.error(err);
        throw err;
      }
    }

    return null;
  };

  const getBySaleorAppId: SaleorConfigProvider["getBySaleorAppId"] =
    async () => {
      return await _extractSecret();
    };

  const getBySaleorDomain: SaleorConfigProvider["getBySaleorDomain"] = async ({
    saleorDomain,
  }) => {
    validateDomain(saleorDomain);

    return await _extractSecret();
  };

  const createOrUpdate: SaleorConfigProvider["createOrUpdate"] = async (
    opts
  ) => {
    let config = await getBySaleorDomain({ saleorDomain: opts.saleorDomain });

    if (config) {
      config.authToken = opts.authToken;
      config.saleorAppId = opts.saleorAppId;
      config.saleorDomain = opts.saleorDomain;
    } else {
      config = saleorBaseConfig.parse(opts);
    }

    const command = new PutSecretValueCommand({
      SecretId: secretsManagerConfigPath,
      SecretString: JSON.stringify(config),
    });

    await secretsManager.send(command);

    return saleorBaseConfig.parse(config);
  };

  return {
    getBySaleorAppId,
    getBySaleorDomain,
    createOrUpdate,
  };
};
