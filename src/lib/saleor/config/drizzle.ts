import { eq } from "drizzle-orm";

import { type DBClient } from "@/lib/plugins/drizzlePlugin/client";
import { saleorConfig } from "@/lib/plugins/drizzlePlugin/schema";

import { saleorBaseConfig } from "./schema";
import {
  type SaleorConfigProvider,
  type SaleorConfigProviderFactory,
} from "./types";
import { validateDomain } from "./utils";

export type SaleorDrizzleConfigProviderOpts = {
  db: DBClient;
};

export const SaleorDrizzleConfigProvider: SaleorConfigProviderFactory<
  SaleorDrizzleConfigProviderOpts
> = ({ db }) => {
  const getBySaleorAppId: SaleorConfigProvider["getBySaleorAppId"] = async ({
    saleorAppId,
  }) => {
    const match = await db.query.saleorConfig.findFirst({
      where: eq(saleorConfig.saleorAppId, saleorAppId),
    });

    if (match) {
      return saleorBaseConfig.parse(match);
    }

    return null;
  };

  const getBySaleorDomain: SaleorConfigProvider["getBySaleorDomain"] = async ({
    saleorDomain,
  }) => {
    validateDomain(saleorDomain);

    const match = await db.query.saleorConfig.findFirst({
      where: eq(saleorConfig.saleorDomain, saleorDomain),
    });

    if (match) {
      return saleorBaseConfig.parse(match);
    }

    return null;
  };

  const createOrUpdate: SaleorConfigProvider["createOrUpdate"] = async (
    opts
  ) => {
    validateDomain(opts.saleorDomain);

    const [config] = await db
      .insert(saleorConfig)
      .values(opts)
      .onConflictDoUpdate({
        target: saleorConfig.saleorDomain,
        set: opts,
      })
      .returning();

    return saleorBaseConfig.parse(config);
  };

  return {
    getBySaleorAppId,
    getBySaleorDomain,
    createOrUpdate,
  };
};
