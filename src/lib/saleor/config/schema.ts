import { z } from "zod";

export const saleorBaseConfig = z.object({
  authToken: z.string(),
  saleorAppId: z.string(),
  saleorDomain: z.string(),
});

export type SaleorBaseConfig = z.infer<typeof saleorBaseConfig>;
