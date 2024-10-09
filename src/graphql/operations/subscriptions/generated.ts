// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested_channel_Channel = { slug: string };

export type AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested_user_User = { email: string, firstName: string };

export type AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested = { redirectUrl: string | null, channel: AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested_channel_Channel | null, user: AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested_user_User | null };

export type AccountChangeEmailRequestedSubscription_Subscription = { event: AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested | null };


export type AccountChangeEmailRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountChangeEmailRequestedSubscription = AccountChangeEmailRequestedSubscription_Subscription;

export type AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested_channel_Channel = { slug: string };

export type AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested_user_User = { firstName: string, email: string };

export type AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested = { redirectUrl: string | null, channel: AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested_channel_Channel | null, user: AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested_user_User | null };

export type AccountConfirmationRequestedSubscription_Subscription = { event: AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested | null };


export type AccountConfirmationRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountConfirmationRequestedSubscription = AccountConfirmationRequestedSubscription_Subscription;

export type AccountConfirmedSubscription_event_AccountConfirmed_channel_Channel = { slug: string };

export type AccountConfirmedSubscription_event_AccountConfirmed_user_User = { firstName: string, email: string };

export type AccountConfirmedSubscription_event_AccountConfirmed = { channel: AccountConfirmedSubscription_event_AccountConfirmed_channel_Channel | null, user: AccountConfirmedSubscription_event_AccountConfirmed_user_User | null };

export type AccountConfirmedSubscription_Subscription = { event: AccountConfirmedSubscription_event_AccountConfirmed | null };


export type AccountConfirmedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountConfirmedSubscription = AccountConfirmedSubscription_Subscription;

export type AccountDeleteRequestedSubscription_event_AccountDeleteRequested_channel_Channel = { slug: string };

export type AccountDeleteRequestedSubscription_event_AccountDeleteRequested_user_User = { email: string, firstName: string };

export type AccountDeleteRequestedSubscription_event_AccountDeleteRequested = { redirectUrl: string | null, channel: AccountDeleteRequestedSubscription_event_AccountDeleteRequested_channel_Channel | null, user: AccountDeleteRequestedSubscription_event_AccountDeleteRequested_user_User | null };

export type AccountDeleteRequestedSubscription_Subscription = { event: AccountDeleteRequestedSubscription_event_AccountDeleteRequested | null };


export type AccountDeleteRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountDeleteRequestedSubscription = AccountDeleteRequestedSubscription_Subscription;

export type AccountDeletedSubscription_event_AccountDeleted_channel_Channel = { slug: string };

export type AccountDeletedSubscription_event_AccountDeleted_user_User = { firstName: string, email: string };

export type AccountDeletedSubscription_event_AccountDeleted = { channel: AccountDeletedSubscription_event_AccountDeleted_channel_Channel | null, user: AccountDeletedSubscription_event_AccountDeleted_user_User | null };

export type AccountDeletedSubscription_Subscription = { event: AccountDeletedSubscription_event_AccountDeleted | null };


export type AccountDeletedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountDeletedSubscription = AccountDeletedSubscription_Subscription;

export type AccountEmailChangedSubscription_event_AccountEmailChanged_channel_Channel = { slug: string };

export type AccountEmailChangedSubscription_event_AccountEmailChanged_user_User = { email: string, firstName: string };

export type AccountEmailChangedSubscription_event_AccountEmailChanged = { channel: AccountEmailChangedSubscription_event_AccountEmailChanged_channel_Channel | null, user: AccountEmailChangedSubscription_event_AccountEmailChanged_user_User | null };

export type AccountEmailChangedSubscription_Subscription = { event: AccountEmailChangedSubscription_event_AccountEmailChanged | null };


export type AccountEmailChangedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountEmailChangedSubscription = AccountEmailChangedSubscription_Subscription;

export type AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested_channel_Channel = { slug: string };

export type AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested_user_User = { email: string, firstName: string };

export type AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested = { redirectUrl: string | null, channel: AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested_channel_Channel | null, user: AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested_user_User | null };

export type AccountSetPasswordRequestedSubscription_Subscription = { event: AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested | null };


export type AccountSetPasswordRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountSetPasswordRequestedSubscription = AccountSetPasswordRequestedSubscription_Subscription;

export type FulfillmentTrackingNumberUpdatedSubscription_event_FulfillmentTrackingNumberUpdated_order_Order = { number: string, userEmail: string | null };

export type FulfillmentTrackingNumberUpdatedSubscription_event_FulfillmentTrackingNumberUpdated = { order: FulfillmentTrackingNumberUpdatedSubscription_event_FulfillmentTrackingNumberUpdated_order_Order | null };

export type FulfillmentTrackingNumberUpdatedSubscription_Subscription = { event: FulfillmentTrackingNumberUpdatedSubscription_event_FulfillmentTrackingNumberUpdated | null };


export type FulfillmentTrackingNumberUpdatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type FulfillmentTrackingNumberUpdatedSubscription = FulfillmentTrackingNumberUpdatedSubscription_Subscription;

export type GiftCardSentSubscription_event_GiftCardSent = { sentToEmail: string | null };

export type GiftCardSentSubscription_Subscription = { event: GiftCardSentSubscription_event_GiftCardSent | null };


export type GiftCardSentSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GiftCardSentSubscription = GiftCardSentSubscription_Subscription;

export type OrderCancelledSubscription_event_OrderCancelled_order_Order_channel_Channel = { slug: string };

export type OrderCancelledSubscription_event_OrderCancelled_order_Order_user_User = { firstName: string };

export type OrderCancelledSubscription_event_OrderCancelled_order_Order = { userEmail: string | null, channel: OrderCancelledSubscription_event_OrderCancelled_order_Order_channel_Channel, user: OrderCancelledSubscription_event_OrderCancelled_order_Order_user_User | null };

export type OrderCancelledSubscription_event_OrderCancelled = { order: OrderCancelledSubscription_event_OrderCancelled_order_Order | null };

export type OrderCancelledSubscription_Subscription = { event: OrderCancelledSubscription_event_OrderCancelled | null };


export type OrderCancelledSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OrderCancelledSubscription = OrderCancelledSubscription_Subscription;

export type OrderCreatedSubscription_event_OrderCreated_order_Order_channel_Channel = { slug: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_user_User = { firstName: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_shippingAddress_Address_country_CountryDisplay = { code: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_shippingAddress_Address = { id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string | null, country: OrderCreatedSubscription_event_OrderCreated_order_Order_shippingAddress_Address_country_CountryDisplay };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_shippingPrice_TaxedMoney_net_Money = { amount: number, currency: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_shippingPrice_TaxedMoney = { net: OrderCreatedSubscription_event_OrderCreated_order_Order_shippingPrice_TaxedMoney_net_Money };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_subtotal_TaxedMoney_net_Money = { amount: number, currency: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_subtotal_TaxedMoney = { net: OrderCreatedSubscription_event_OrderCreated_order_Order_subtotal_TaxedMoney_net_Money };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_total_TaxedMoney_gross_Money = { amount: number, currency: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_total_TaxedMoney = { gross: OrderCreatedSubscription_event_OrderCreated_order_Order_total_TaxedMoney_gross_Money };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_thumbnail_Image = { url: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_unitPrice_TaxedMoney_gross_Money = { amount: number, currency: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_unitPrice_TaxedMoney_net_Money = { amount: number, currency: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_unitPrice_TaxedMoney = { gross: OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_unitPrice_TaxedMoney_gross_Money, net: OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_unitPrice_TaxedMoney_net_Money };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_variant_ProductVariant_product_Product = { slug: string };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_variant_ProductVariant = { product: OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_variant_ProductVariant_product_Product };

export type OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine = { quantity: number, variantName: string, productName: string, thumbnail: OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_thumbnail_Image | null, unitPrice: OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_unitPrice_TaxedMoney, variant: OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine_variant_ProductVariant | null };

export type OrderCreatedSubscription_event_OrderCreated_order_Order = { number: string, displayGrossPrices: boolean, languageCodeEnum: Types.LanguageCodeEnum, userEmail: string | null, channel: OrderCreatedSubscription_event_OrderCreated_order_Order_channel_Channel, user: OrderCreatedSubscription_event_OrderCreated_order_Order_user_User | null, shippingAddress: OrderCreatedSubscription_event_OrderCreated_order_Order_shippingAddress_Address | null, shippingPrice: OrderCreatedSubscription_event_OrderCreated_order_Order_shippingPrice_TaxedMoney, subtotal: OrderCreatedSubscription_event_OrderCreated_order_Order_subtotal_TaxedMoney, total: OrderCreatedSubscription_event_OrderCreated_order_Order_total_TaxedMoney, lines: Array<OrderCreatedSubscription_event_OrderCreated_order_Order_lines_OrderLine> };

export type OrderCreatedSubscription_event_OrderCreated = { order: OrderCreatedSubscription_event_OrderCreated_order_Order | null };

export type OrderCreatedSubscription_Subscription = { event: OrderCreatedSubscription_event_OrderCreated | null };


export type OrderCreatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OrderCreatedSubscription = OrderCreatedSubscription_Subscription;

export type OrderRefundedSubscription_event_OrderCancelled_order_Order = { number: string, userEmail: string | null };

export type OrderRefundedSubscription_event_OrderCancelled = { order: OrderRefundedSubscription_event_OrderCancelled_order_Order | null };

export type OrderRefundedSubscription_Subscription = { event: OrderRefundedSubscription_event_OrderCancelled | null };


export type OrderRefundedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OrderRefundedSubscription = OrderRefundedSubscription_Subscription;

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AccountChangeEmailRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountChangeEmailRequestedSubscription {
  event {
    ... on AccountChangeEmailRequested {
      redirectUrl
      channel {
        ...ChannelFragment
      }
      user {
        email
        firstName
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountChangeEmailRequestedSubscription, AccountChangeEmailRequestedSubscriptionVariables>;
export const AccountConfirmationRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountConfirmationRequestedSubscription {
  event {
    ... on AccountConfirmationRequested {
      redirectUrl
      channel {
        ...ChannelFragment
      }
      user {
        firstName
        email
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountConfirmationRequestedSubscription, AccountConfirmationRequestedSubscriptionVariables>;
export const AccountConfirmedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountConfirmedSubscription {
  event {
    ... on AccountConfirmed {
      channel {
        ...ChannelFragment
      }
      user {
        firstName
        email
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountConfirmedSubscription, AccountConfirmedSubscriptionVariables>;
export const AccountDeleteRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountDeleteRequestedSubscription {
  event {
    ... on AccountDeleteRequested {
      redirectUrl
      channel {
        ...ChannelFragment
      }
      user {
        email
        firstName
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountDeleteRequestedSubscription, AccountDeleteRequestedSubscriptionVariables>;
export const AccountDeletedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountDeletedSubscription {
  event {
    ... on AccountDeleted {
      channel {
        ...ChannelFragment
      }
      user {
        firstName
        email
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountDeletedSubscription, AccountDeletedSubscriptionVariables>;
export const AccountEmailChangedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountEmailChangedSubscription {
  event {
    ... on AccountEmailChanged {
      channel {
        ...ChannelFragment
      }
      user {
        email
        firstName
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountEmailChangedSubscription, AccountEmailChangedSubscriptionVariables>;
export const AccountSetPasswordRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountSetPasswordRequestedSubscription {
  event {
    ... on AccountSetPasswordRequested {
      redirectUrl
      channel {
        ...ChannelFragment
      }
      user {
        email
        firstName
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<AccountSetPasswordRequestedSubscription, AccountSetPasswordRequestedSubscriptionVariables>;
export const FulfillmentTrackingNumberUpdatedSubscriptionDocument = new TypedDocumentString(`
    subscription FulfillmentTrackingNumberUpdatedSubscription {
  event {
    ... on FulfillmentTrackingNumberUpdated {
      order {
        number
        userEmail
      }
    }
  }
}
    `) as unknown as TypedDocumentString<FulfillmentTrackingNumberUpdatedSubscription, FulfillmentTrackingNumberUpdatedSubscriptionVariables>;
export const GiftCardSentSubscriptionDocument = new TypedDocumentString(`
    subscription GiftCardSentSubscription {
  event {
    ... on GiftCardSent {
      sentToEmail
    }
  }
}
    `) as unknown as TypedDocumentString<GiftCardSentSubscription, GiftCardSentSubscriptionVariables>;
export const OrderCancelledSubscriptionDocument = new TypedDocumentString(`
    subscription OrderCancelledSubscription {
  event {
    ... on OrderCancelled {
      order {
        channel {
          ...ChannelFragment
        }
        userEmail
        user {
          firstName
        }
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}`) as unknown as TypedDocumentString<OrderCancelledSubscription, OrderCancelledSubscriptionVariables>;
export const OrderCreatedSubscriptionDocument = new TypedDocumentString(`
    subscription OrderCreatedSubscription {
  event {
    ... on OrderCreated {
      order {
        ...OrderFragment
      }
    }
  }
}
    fragment ChannelFragment on Channel {
  slug
}
fragment OrderFragment on Order {
  number
  displayGrossPrices
  languageCodeEnum
  channel {
    ...ChannelFragment
  }
  userEmail
  user {
    firstName
  }
  shippingAddress {
    ...AddressFragment
  }
  shippingPrice {
    net {
      ...MoneyFragment
    }
  }
  subtotal {
    net {
      ...MoneyFragment
    }
  }
  total {
    gross {
      ...MoneyFragment
    }
  }
  lines {
    ...OrderLineFragment
  }
}
fragment AddressFragment on Address {
  id
  firstName
  lastName
  companyName
  streetAddress1
  streetAddress2
  city
  postalCode
  country {
    ...CountryFragment
  }
  countryArea
  phone
}
fragment CountryFragment on CountryDisplay {
  code
}
fragment MoneyFragment on Money {
  amount
  currency
}
fragment OrderLineFragment on OrderLine {
  quantity
  variantName
  productName
  thumbnail {
    ...Thumbnail
  }
  unitPrice {
    ...TaxedMoneyFragment
  }
  variant {
    product {
      slug
    }
  }
}
fragment Thumbnail on Image {
  url
}
fragment TaxedMoneyFragment on TaxedMoney {
  gross {
    ...MoneyFragment
  }
  net {
    ...MoneyFragment
  }
}`) as unknown as TypedDocumentString<OrderCreatedSubscription, OrderCreatedSubscriptionVariables>;
export const OrderRefundedSubscriptionDocument = new TypedDocumentString(`
    subscription OrderRefundedSubscription {
  event {
    ... on OrderCancelled {
      order {
        number
        userEmail
      }
    }
  }
}
    `) as unknown as TypedDocumentString<OrderRefundedSubscription, OrderRefundedSubscriptionVariables>;