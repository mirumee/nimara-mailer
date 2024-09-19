import { type GraphqlClient } from "@/lib/graphql/client";

export type SaleorClientFactory = (opts: {
  authToken?: string;
  saleorUrl: string;
  timeout?: number;
}) => {
  execute: GraphqlClient["execute"];
  getAppId: () => Promise<null | string>;
};

export type SaleorClient = ReturnType<SaleorClientFactory>;
