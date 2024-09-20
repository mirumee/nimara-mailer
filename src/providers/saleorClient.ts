import { baseSaleorClient } from "@/lib/saleor/client/client";
import { type SaleorClientFactory } from "@/lib/saleor/client/types";

export const getSaleorClient = (...opts: Parameters<SaleorClientFactory>) =>
  baseSaleorClient(...opts);
