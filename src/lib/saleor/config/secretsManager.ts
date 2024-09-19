import {
  GetSecretValueCommand,
  PutSecretValueCommand,
  type SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

import { logger } from "@/lib/logger";

import { saleorBaseConfig } from "./schema";
import {
  type SaleorConfigProvider,
  type SaleorConfigProviderFactory,
} from "./types";
import { validateDomain } from "./utils";

export type SaleorSecretsManagerConfigProviderOpts = {
  secretsManager: SecretsManagerClient;
  secretsManagerConfigPath: string;
};

export const SaleorSecretsManagerConfigProvider: SaleorConfigProviderFactory<
  SaleorSecretsManagerConfigProviderOpts
> = ({ secretsManager, secretsManagerConfigPath }) => {
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

    return saleorBaseConfig.parse(config);
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
    validateDomain(opts.saleorDomain);

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
