import { AppIdQueryDocument } from "@/graphql/operations/queries/generated";
import { graphqlClient } from "@/lib/graphql/client";
import { type SaleorClientFactory } from "@/lib/saleor/client/types";

export const baseSaleorClient: SaleorClientFactory = ({
  saleorUrl,
  authToken,
  timeout,
  logger,
}) => {
  const client = graphqlClient(`${saleorUrl}/graphql/`, {
    authToken,
    timeout,
    logger,
  });

  const execute = client.execute;

  const getAppId = async () => {
    const { app } = await client.execute(AppIdQueryDocument);

    return app?.id ?? null;
  };

  return {
    execute,
    getAppId,
  };
};
