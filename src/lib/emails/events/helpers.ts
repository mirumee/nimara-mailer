import { type FastifyRequest } from "fastify";

import { CONFIG } from "@/config";
import { type WebhookEventTypeAsyncEnum } from "@/graphql/schema";
import { getJSONFormatHeader } from "@/lib/saleor/apps/utils";

export const serializePayload = ({
  data,
  event,
}: {
  data: FastifyRequest["body"];
  event: Lowercase<WebhookEventTypeAsyncEnum>;
}) => ({
  format: getJSONFormatHeader({ name: CONFIG.NAME }),
  payload: {
    event,
    data,
  },
});

export type SerializedPayload = ReturnType<typeof serializePayload>;
