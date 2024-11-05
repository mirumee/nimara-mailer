import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import rawBody from "fastify-raw-body";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { CONFIG } from "@/config";
import { type SaleorEventType } from "@/const";
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
import { serializePayload } from "@/lib/payload";
import { verifyWebhookSignature } from "@/lib/saleor/auth";
import { saleorWebhookHeaders } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

export const SALEOR_EVENTS_MAP: {
  event: SaleorEventType;
  query: string;
}[] = [
  {
    event: "account_confirmation_requested",
    query: AccountConfirmationRequestedSubscriptionDocument.toString(),
  },
  {
    event: "account_confirmed",
    query: AccountConfirmedSubscriptionDocument.toString(),
  },
  {
    event: "account_set_password_requested",
    query: AccountSetPasswordRequestedSubscriptionDocument.toString(),
  },
  {
    event: "account_delete_requested",
    query: AccountDeleteRequestedSubscriptionDocument.toString(),
  },
  {
    event: "account_deleted",
    query: AccountDeletedSubscriptionDocument.toString(),
  },
  {
    event: "account_change_email_requested",
    query: AccountChangeEmailRequestedSubscriptionDocument.toString(),
  },
  {
    event: "account_email_changed",
    query: AccountEmailChangedSubscriptionDocument.toString(),
  },
  {
    event: "order_created",
    query: OrderCreatedSubscriptionDocument.toString(),
  },
  {
    event: "order_cancelled",
    query: OrderCancelledSubscriptionDocument.toString(),
  },
  {
    event: "order_refunded",
    query: OrderRefundedSubscriptionDocument.toString(),
  },
  {
    event: "fulfillment_tracking_number_updated",
    query: FulfillmentTrackingNumberUpdatedSubscriptionDocument.toString(),
  },
  {
    event: "fulfillment_created",
    query: FulfillmentCreatedSubscriptionDocument.toString(),
  },
  {
    event: "gift_card_sent",
    query: GiftCardSentSubscriptionDocument.toString(),
  },
];

export const saleorWebhooksRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(rawBody);

  SALEOR_EVENTS_MAP.forEach(({ event }) => {
    const name = event.replaceAll("_", "-");

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
