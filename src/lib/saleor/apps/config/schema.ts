import { z } from "zod";

export const saleorAppConfigSchema = (
  z.object({
    SALEOR_URL: z.string(),
    SALEOR_DOMAIN: z.string().optional(),
    SALEOR_GRAPHQL_URL: z.string().url().optional(),
  }) as any as z.ZodObject<{
    SALEOR_DOMAIN: z.ZodString;
    SALEOR_GRAPHQL_URL: z.ZodString;
    SALEOR_URL: z.ZodString;
  }>
).refine((data) => {
  if (data.SALEOR_URL) {
    data.SALEOR_GRAPHQL_URL = `${data.SALEOR_URL}/graphql/`;
    data.SALEOR_DOMAIN = new URL(data.SALEOR_URL ?? "").hostname;
  }
  return data;
});
