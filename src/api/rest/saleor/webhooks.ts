import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import rawBody from "fastify-raw-body";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { CONFIG } from "@/config";
import {
  AccountChangeEmailRequestedSubscriptionDocument,
  AccountConfirmationRequestedSubscriptionDocument,
  AccountConfirmedSubscriptionDocument,
  AccountDeletedSubscriptionDocument,
  AccountDeleteRequestedSubscriptionDocument,
  AccountEmailChangedSubscriptionDocument,
  AccountSetPasswordRequestedSubscriptionDocument,
  FulfillmentCreatedSubscriptionDocument,
  FulfillmentTrackingNumberUpdatedSubscriptionDocument,
  GiftCardSentSubscriptionDocument,
  OrderCancelledSubscriptionDocument,
  OrderCreatedSubscriptionDocument,
  OrderRefundedSubscriptionDocument,
} from "@/graphql/operations/subscriptions/generated";
import { type WebhookEventTypeAsyncEnum } from "@/graphql/schema";
import { serializePayload } from "@/lib/payload";
import { verifyWebhookSignature } from "@/lib/saleor/auth";
import { saleorWebhookHeaders } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

export const EVENT_HANDLERS: {
  event: WebhookEventTypeAsyncEnum;
  query: string;
}[] = [
  {
    event: "ACCOUNT_CONFIRMATION_REQUESTED",
    query: AccountConfirmationRequestedSubscriptionDocument.toString(),
  },
  {
    event: "ACCOUNT_CONFIRMED",
    query: AccountConfirmedSubscriptionDocument.toString(),
  },
  {
    event: "ACCOUNT_SET_PASSWORD_REQUESTED",
    query: AccountSetPasswordRequestedSubscriptionDocument.toString(),
  },
  {
    event: "ACCOUNT_DELETE_REQUESTED",
    query: AccountDeleteRequestedSubscriptionDocument.toString(),
  },
  {
    event: "ACCOUNT_DELETED",
    query: AccountDeletedSubscriptionDocument.toString(),
  },
  {
    event: "ACCOUNT_CHANGE_EMAIL_REQUESTED",
    query: AccountChangeEmailRequestedSubscriptionDocument.toString(),
  },
  {
    event: "ACCOUNT_EMAIL_CHANGED",
    query: AccountEmailChangedSubscriptionDocument.toString(),
  },
  {
    event: "ORDER_CREATED",
    query: OrderCreatedSubscriptionDocument.toString(),
  },
  {
    event: "ORDER_CANCELLED",
    query: OrderCancelledSubscriptionDocument.toString(),
  },
  {
    event: "ORDER_REFUNDED",
    query: OrderRefundedSubscriptionDocument.toString(),
  },
  {
    event: "FULFILLMENT_TRACKING_NUMBER_UPDATED",
    query: FulfillmentTrackingNumberUpdatedSubscriptionDocument.toString(),
  },
  {
    event: "FULFILLMENT_CREATED",
    query: FulfillmentCreatedSubscriptionDocument.toString(),
  },
  {
    event: "GIFT_CARD_SENT",
    query: GiftCardSentSubscriptionDocument.toString(),
  },
];

export const saleorWebhooksRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(rawBody);

  EVENT_HANDLERS.forEach(({ event }) => {
    const name = event.toLowerCase().replaceAll("_", "-");

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

        return reply.status(200).send({ status: "ok" });
      }
    );
  });
};
