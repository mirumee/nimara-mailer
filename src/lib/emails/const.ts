import { type ComponentType } from "react";

import { type WebhookEventTypeAsyncEnum } from "@/graphql/schema";
import { AccountChangeEmailRequestedEmail } from "@/templates/AccountChangeEmailRequestedEmail";
import { AccountConfirmationRequestedEmail } from "@/templates/AccountConfirmationRequestedEmail";
import { AccountConfirmedEmail } from "@/templates/AccountConfirmedEmail";
import { AccountDeletedEmail } from "@/templates/AccountDeletedEmail";
import { AccountDeleteRequestedEmail } from "@/templates/AccountDeleteRequestedEmail";
import { AccountEmailChangedEmail } from "@/templates/AccountEmailChangedEmail";
import { AccountSetPasswordRequestedEmail } from "@/templates/AccountSetPasswordRequestedEmail";
import { FulfillmentTrackingNumberUpdatedEmail } from "@/templates/FulfillmentTrackingNumberUpdatedEmail";
import { GiftCardSentEmail } from "@/templates/GiftCardSentEmail";
import { OrderCancelledEmail } from "@/templates/OrderCancelledEmail";
import { OrderCreatedEmail } from "@/templates/OrderCreatedEmail";
import { OrderRefundedEmail } from "@/templates/OrderRefundedEmail";

const extractEmailFromOrder = (data: { order: { userEmail: string } }) =>
  data.order.userEmail;

const extractEmailFromGiftCard = (data: { sentToEmail: string }) =>
  data.sentToEmail;

const extractEmailFromUser = (data: { user: { email: string } }) =>
  data.user.email;

export const TEMPLATES_MAP: {
  [key in Lowercase<WebhookEventTypeAsyncEnum>]?: {
    extractFn: (data: any) => string;
    template: ComponentType<any> & { Subject: string };
  };
} = {
  order_created: {
    template: OrderCreatedEmail,
    extractFn: extractEmailFromOrder,
  },
  order_cancelled: {
    template: OrderCancelledEmail,
    extractFn: extractEmailFromOrder,
  },
  order_refunded: {
    template: OrderRefundedEmail,
    extractFn: extractEmailFromOrder,
  },
  fulfillment_tracking_number_updated: {
    template: FulfillmentTrackingNumberUpdatedEmail,
    extractFn: extractEmailFromOrder,
  },
  gift_card_sent: {
    template: GiftCardSentEmail,
    extractFn: extractEmailFromGiftCard,
  },
  account_set_password_requested: {
    template: AccountSetPasswordRequestedEmail,
    extractFn: extractEmailFromUser,
  },
  account_email_changed: {
    template: AccountEmailChangedEmail,
    extractFn: extractEmailFromUser,
  },
  account_delete_requested: {
    template: AccountDeleteRequestedEmail,
    extractFn: extractEmailFromUser,
  },
  account_deleted: {
    template: AccountDeletedEmail,
    extractFn: extractEmailFromUser,
  },
  account_confirmed: {
    template: AccountConfirmedEmail,
    extractFn: extractEmailFromUser,
  },
  account_confirmation_requested: {
    template: AccountConfirmationRequestedEmail,
    extractFn: extractEmailFromUser,
  },
  account_change_email_requested: {
    template: AccountChangeEmailRequestedEmail,
    extractFn: extractEmailFromUser,
  },
};
