// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested_user_User = { email: string };

export type AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested = { user: AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested_user_User | null };

export type AccountChangeEmailRequestedSubscription_Subscription = { event: AccountChangeEmailRequestedSubscription_event_AccountChangeEmailRequested | null };


export type AccountChangeEmailRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountChangeEmailRequestedSubscription = AccountChangeEmailRequestedSubscription_Subscription;

export type AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested_user_User = { firstName: string, email: string };

export type AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested = { redirectUrl: string | null, token: string | null, user: AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested_user_User | null };

export type AccountConfirmationRequestedSubscription_Subscription = { event: AccountConfirmationRequestedSubscription_event_AccountConfirmationRequested | null };


export type AccountConfirmationRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountConfirmationRequestedSubscription = AccountConfirmationRequestedSubscription_Subscription;

export type AccountConfirmedSubscription_event_AccountConfirmed_user_User = { firstName: string, email: string };

export type AccountConfirmedSubscription_event_AccountConfirmed = { user: AccountConfirmedSubscription_event_AccountConfirmed_user_User | null };

export type AccountConfirmedSubscription_Subscription = { event: AccountConfirmedSubscription_event_AccountConfirmed | null };


export type AccountConfirmedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountConfirmedSubscription = AccountConfirmedSubscription_Subscription;

export type AccountDeleteRequestedSubscription_event_AccountDeleteRequested_user_User = { email: string };

export type AccountDeleteRequestedSubscription_event_AccountDeleteRequested = { user: AccountDeleteRequestedSubscription_event_AccountDeleteRequested_user_User | null };

export type AccountDeleteRequestedSubscription_Subscription = { event: AccountDeleteRequestedSubscription_event_AccountDeleteRequested | null };


export type AccountDeleteRequestedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountDeleteRequestedSubscription = AccountDeleteRequestedSubscription_Subscription;

export type AccountDeletedSubscription_event_AccountDeleted_user_User = { email: string };

export type AccountDeletedSubscription_event_AccountDeleted = { user: AccountDeletedSubscription_event_AccountDeleted_user_User | null };

export type AccountDeletedSubscription_Subscription = { event: AccountDeletedSubscription_event_AccountDeleted | null };


export type AccountDeletedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountDeletedSubscription = AccountDeletedSubscription_Subscription;

export type AccountEmailChangedSubscription_event_AccountEmailChanged_user_User = { email: string };

export type AccountEmailChangedSubscription_event_AccountEmailChanged = { user: AccountEmailChangedSubscription_event_AccountEmailChanged_user_User | null };

export type AccountEmailChangedSubscription_Subscription = { event: AccountEmailChangedSubscription_event_AccountEmailChanged | null };


export type AccountEmailChangedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountEmailChangedSubscription = AccountEmailChangedSubscription_Subscription;

export type AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested_user_User = { email: string, firstName: string };

export type AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested = { redirectUrl: string | null, user: AccountSetPasswordRequestedSubscription_event_AccountSetPasswordRequested_user_User | null };

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

export type OrderCancelledSubscription_event_OrderCancelled_order_Order = { number: string, userEmail: string | null };

export type OrderCancelledSubscription_event_OrderCancelled = { order: OrderCancelledSubscription_event_OrderCancelled_order_Order | null };

export type OrderCancelledSubscription_Subscription = { event: OrderCancelledSubscription_event_OrderCancelled | null };


export type OrderCancelledSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OrderCancelledSubscription = OrderCancelledSubscription_Subscription;

export type OrderCreatedSubscription_event_OrderCreated_order_Order = { number: string, userEmail: string | null };

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
      user {
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountChangeEmailRequestedSubscription, AccountChangeEmailRequestedSubscriptionVariables>;
export const AccountConfirmationRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountConfirmationRequestedSubscription {
  event {
    ... on AccountConfirmationRequested {
      redirectUrl
      token
      user {
        firstName
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountConfirmationRequestedSubscription, AccountConfirmationRequestedSubscriptionVariables>;
export const AccountConfirmedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountConfirmedSubscription {
  event {
    ... on AccountConfirmed {
      user {
        firstName
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountConfirmedSubscription, AccountConfirmedSubscriptionVariables>;
export const AccountDeleteRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountDeleteRequestedSubscription {
  event {
    ... on AccountDeleteRequested {
      user {
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountDeleteRequestedSubscription, AccountDeleteRequestedSubscriptionVariables>;
export const AccountDeletedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountDeletedSubscription {
  event {
    ... on AccountDeleted {
      user {
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountDeletedSubscription, AccountDeletedSubscriptionVariables>;
export const AccountEmailChangedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountEmailChangedSubscription {
  event {
    ... on AccountEmailChanged {
      user {
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountEmailChangedSubscription, AccountEmailChangedSubscriptionVariables>;
export const AccountSetPasswordRequestedSubscriptionDocument = new TypedDocumentString(`
    subscription AccountSetPasswordRequestedSubscription {
  event {
    ... on AccountSetPasswordRequested {
      redirectUrl
      user {
        email
        firstName
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountSetPasswordRequestedSubscription, AccountSetPasswordRequestedSubscriptionVariables>;
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
        number
        userEmail
      }
    }
  }
}
    `) as unknown as TypedDocumentString<OrderCancelledSubscription, OrderCancelledSubscriptionVariables>;
export const OrderCreatedSubscriptionDocument = new TypedDocumentString(`
    subscription OrderCreatedSubscription {
  event {
    ... on OrderCreated {
      order {
        number
        userEmail
      }
    }
  }
}
    `) as unknown as TypedDocumentString<OrderCreatedSubscription, OrderCreatedSubscriptionVariables>;
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