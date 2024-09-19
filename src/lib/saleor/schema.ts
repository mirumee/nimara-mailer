import { z } from "zod";

/**
 * Headers must be in lowercase, otherwise it will not be lookup by zod type provider.
 */
export const saleorHeaders = z.object({
  "saleor-domain": z.string(),
  "saleor-api-url": z.string(),
});

export type SaleorHeaders = z.infer<typeof saleorHeaders>;

export const saleorWebhookHeaders = z
  .object({
    "saleor-signature": z.string(),
    "saleor-event": z.string(),
  })
  .merge(saleorHeaders);

export type SaleorWebhookHeaders = z.infer<typeof saleorWebhookHeaders>;

export const saleorBearerHeader = z.object({
  authorization: z.string().transform((value) => value.replace("Bearer ", "")),
});

export type SaleorBearerHeader = z.infer<typeof saleorBearerHeader>;
