import { type SaleorBaseConfig } from "./schema";

export type SaleorConfigProviderFactory<
  Opts = unknown,
  Config = SaleorBaseConfig,
> = (opts: Opts) => {
  createOrUpdate: (opts: Config) => Promise<Config>;
  getBySaleorAppId: (opts: { saleorAppId: string }) => Promise<Config | null>;
  getBySaleorDomain: (opts: { saleorDomain: string }) => Promise<Config | null>;
};

export type SaleorConfigProvider = ReturnType<SaleorConfigProviderFactory>;
