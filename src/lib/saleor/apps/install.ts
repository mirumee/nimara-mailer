import { SaleorAppInstallationError } from "@/lib/errors/api";
import { type SaleorClient } from "@/lib/saleor/client/types";
import { type SaleorConfigProvider } from "@/lib/saleor/config/types";
import { type JWSProvider } from "@/lib/saleor/jwks/types";

export const installApp = async ({
  configProvider,
  saleorClient,
  saleorAuthToken,
  saleorUrl,
  saleorDomain,
  jwksProvider,
}: {
  configProvider: SaleorConfigProvider;
  jwksProvider: JWSProvider;
  saleorAuthToken: string;
  saleorClient: SaleorClient;
  saleorDomain: string;
  saleorUrl: string;
}) => {
  const saleorAppId = await saleorClient.getAppId();

  if (!saleorAppId) {
    throw new SaleorAppInstallationError();
  }

  await configProvider.createOrUpdate({
    saleorDomain,
    authToken: saleorAuthToken,
    saleorAppId,
  });

  await jwksProvider.get({
    issuer: saleorUrl,
    forceRefresh: true,
  });
};
