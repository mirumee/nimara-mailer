import { type ComponentType } from "react";

import { type EmailEventType } from "@/const";
import CustomEventEmail from "@/emails/templates/custom/CustomEventEmail";
import AccountChangeEmailRequestedEmail from "@/emails/templates/saleor/AccountChangeEmailRequestedEmail";
import AccountConfirmationRequestedEmail from "@/emails/templates/saleor/AccountConfirmationRequestedEmail";
import AccountConfirmedEmail from "@/emails/templates/saleor/AccountConfirmedEmail";
import AccountDeletedEmail from "@/emails/templates/saleor/AccountDeletedEmail";
import AccountDeleteRequestedEmail from "@/emails/templates/saleor/AccountDeleteRequestedEmail";
import AccountEmailChangedEmail from "@/emails/templates/saleor/AccountEmailChangedEmail";
import AccountSetPasswordRequestedEmail from "@/emails/templates/saleor/AccountSetPasswordRequestedEmail";
import FulfillmentCreatedEmail from "@/emails/templates/saleor/FulfillmentCreatedEmail";
import FulfillmentTrackingNumberUpdatedEmail from "@/emails/templates/saleor/FulfillmentTrackingNumberUpdatedEmail";
import GiftCardSentEmail from "@/emails/templates/saleor/GiftCardSentEmail";
import OrderCancelledEmail from "@/emails/templates/saleor/OrderCancelledEmail";
import OrderCreatedEmail from "@/emails/templates/saleor/OrderCreatedEmail";
import OrderRefundedEmail from "@/emails/templates/saleor/OrderRefundedEmail";

const extractEmailFromOrder = (data: { order: { userEmail: string } }) =>
  data.order.userEmail;

const extractEmailFromGiftCard = (data: { sentToEmail: string }) =>
  data.sentToEmail;

const extractEmailFromUser = (data: { user: { email: string } }) =>
  data.user.email;

const extractEmailFromCustomEvent = (data: { email: string }) => data.email;

export const TEMPLATES_MAP: {
  [key in EmailEventType]?: {
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
  fulfillment_created: {
    template: FulfillmentCreatedEmail,
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
  custom_event: {
    template: CustomEventEmail,
    extractFn: extractEmailFromCustomEvent,
  },
};
