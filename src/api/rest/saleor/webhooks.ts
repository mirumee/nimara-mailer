import { ReceiveMessageCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import rawBody from "fastify-raw-body";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { CONFIG } from "@/config";
import {
  OrderCreatedSubscriptionDocument,
  OrderUpdatedSubscriptionDocument,
} from "@/graphql/operations/subscriptions/generated";
import { type WebhookEventTypeAsyncEnum } from "@/graphql/schema";
import { serializePayload } from "@/lib/emails/events/helpers";
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

  EVENT_HANDLERS.forEach(({ name }) => {
    fastify.withTypeProvider<ZodTypeProvider>().post(
      `/email/${name}`,
      {
        name: `saleor:webhooks:email:${name}`,
        schema: {
          headers: saleorWebhookHeaders,
        },
      },
      async (request, reply) => {
        await verifyWebhookSignature({
          forceRefresh: true,
          issuer: request.headers["saleor-api-url"],
          jwksProvider: getJWKSProvider(),
          jws: request.headers["saleor-signature"],
          payload: request.rawBody,
        });

        fastify.log.info(
          `Received webhook for '${request.headers["saleor-event"]}'.`
        );
        fastify.log.debug("Webhook payload:", { payload: request.body });

        const payload = serializePayload({
          data: request.body,
          event: request.headers["saleor-event"],
        });
        const command = new SendMessageCommand({
          QueueUrl: CONFIG.SQS_QUEUE_URL,
          MessageBody: JSON.stringify(payload),
        });

        await fastify.sqs.send(command);

        /**
         * FIXME: Remove when proxy setup is ready.
         * Temporary solution to mimic proxy behavior.
         */
        const { Messages } = await fastify.sqs.send(
          new ReceiveMessageCommand({ QueueUrl: CONFIG.SQS_QUEUE_URL })
        );
        await fetch(`http://0.0.0.0:${CONFIG.PROXY_PORT}`, {
          method: "POST",
          body: JSON.stringify({
            format: "application/vnd.mirumee.nimara.event_proxy.v1+json",
            event: {
              Records: Messages,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return reply.status(200).send({ status: "ok" });
      }
    );
  });
};
