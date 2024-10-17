import { type FastifyRequest } from "fastify";
import { z } from "zod";

import { EVENT_HANDLERS } from "@/api/rest/saleor/webhooks";
import { CONFIG } from "@/config";
import { type WebhookEventTypeAsyncEnum } from "@/graphql/schema";
import { getJSONFormatHeader } from "@/lib/saleor/apps/utils";

export const SUPPORTED_EVENTS = EVENT_HANDLERS.map(({ event }) =>
  event.toLowerCase()
) as any as z.EnumValues<Lowercase<WebhookEventTypeAsyncEnum>>;

export type Event = (typeof SUPPORTED_EVENTS)[number];

export const payloadSchema = z.object({
  format: z.string(),
  payload: z.object({
    data: z.object({}).passthrough(),
    event: z.enum(SUPPORTED_EVENTS),
  }),
});

export const serializePayload = ({
  data,
  event,
}: {
  data: FastifyRequest["body"];
  event: Event;
}) =>
  payloadSchema.parse({
    format: getJSONFormatHeader({ name: CONFIG.NAME }),
    payload: {
      event,
      data,
    },
  });

export const parsePayload = (data: unknown) => payloadSchema.parse(data);

export type SerializedPayload = ReturnType<typeof serializePayload>;
