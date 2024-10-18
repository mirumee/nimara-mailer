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
    const url = new URL(data.SALEOR_URL);

    data.SALEOR_URL = url.origin;
    data.SALEOR_GRAPHQL_URL = `${url.origin}/graphql/`;
    data.SALEOR_DOMAIN = url.hostname;
  }
  return data;
});
