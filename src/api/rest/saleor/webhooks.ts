import type { FastifyPluginAsync } from "fastify/types/plugin";
import rawBody from "fastify-raw-body";

import {
  OrderCreatedSubscriptionDocument,
  OrderUpdatedSubscriptionDocument,
} from "@/graphql/operations/subscriptions/generated";
import { type WebhookEventTypeAsyncEnum } from "@/graphql/schema";
import { verifyWebhookSignature } from "@/lib/saleor/auth";
import { saleorWebhookHeaders } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

export const EVENT_HANDLERS: {
  event: WebhookEventTypeAsyncEnum;
  name: string;
  query: string;
}[] = [
  {
    event: "ORDER_CREATED",
    name: "order-created",
    query: OrderCreatedSubscriptionDocument.toString(),
  },
  {
    event: "ORDER_UPDATED",
    name: "order-updated",
    query: OrderUpdatedSubscriptionDocument.toString(),
  },
];

export const webhooks: FastifyPluginAsync = async (fastify) => {
  await fastify.register(rawBody);

  fastify.addHook("preHandler", async (request) => {
    const parsedHeaders = saleorWebhookHeaders.parse(request.headers, {
      path: ["headers"],
    });

    await verifyWebhookSignature({
      forceRefresh: true,
      issuer: parsedHeaders["saleor-api-url"],
      jwksProvider: getJWKSProvider(),
      jws: parsedHeaders["saleor-signature"],
      payload: request.rawBody,
    });
  });

  EVENT_HANDLERS.forEach(({ name }) => {
    fastify.post(
      `/email/${name}`,
      {
        name: `saleor:webhooks:email:${name}`,
      },
      async (request, reply) => {
        // TODO: Push to SQS
        return reply.status(200).send({ status: "ok" });
      }
    );
  });
};
