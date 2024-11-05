import { z } from "zod";

import { type WebhookEventTypeAsyncEnum } from "./graphql/schema";

/**
 * Define your Saleor supported events.
 * Note:
 * Saleor uses uppercase events names only in app manifest. In other places,
 * like headers they are lower case so we are using that convention.
 */
export const SALEOR_EVENTS = [
  "account_confirmation_requested",
  "account_confirmed",
  "account_set_password_requested",
  "account_delete_requested",
  "account_deleted",
  "account_change_email_requested",
  "account_email_changed",
  "order_created",
  "order_cancelled",
  "order_refunded",
  "fulfillment_tracking_number_updated",
  "fulfillment_created",
  "gift_card_sent",
] as const satisfies Lowercase<WebhookEventTypeAsyncEnum>[];
/**
 * Define your custom events.
 */
export const CUSTOM_EVENTS = ["custom_event"] as const;

export const EMAIL_EVENTS = [...SALEOR_EVENTS, ...CUSTOM_EVENTS] as const;

export type SaleorEventType = (typeof SALEOR_EVENTS)[number];
export type CustomEventType = (typeof CUSTOM_EVENTS)[number];
export type EmailEventType = SaleorEventType | CustomEventType;

/**
 * Define your custom events body schema.
 */
export const CUSTOM_EVENTS_SCHEMA = {
  custom_event: z.object({
    name: z.string(),
    email: z.string(),
    channel: z.string(),
  }),
} satisfies Record<CustomEventType, z.ZodTypeAny>;
