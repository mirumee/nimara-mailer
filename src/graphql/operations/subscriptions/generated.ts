// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type OrderCreatedSubscription_event_OrderCreated_order_Order = { id: string };

export type OrderCreatedSubscription_event_OrderCreated = { order: OrderCreatedSubscription_event_OrderCreated_order_Order | null };

export type OrderCreatedSubscription_Subscription = { event: OrderCreatedSubscription_event_OrderCreated | null };


export type OrderCreatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OrderCreatedSubscription = OrderCreatedSubscription_Subscription;

export type OrderUpdatedSubscription_event_OrderUpdated_order_Order = { id: string };

export type OrderUpdatedSubscription_event_OrderUpdated = { order: OrderUpdatedSubscription_event_OrderUpdated_order_Order | null };

export type OrderUpdatedSubscription_Subscription = { event: OrderUpdatedSubscription_event_OrderUpdated | null };


export type OrderUpdatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OrderUpdatedSubscription = OrderUpdatedSubscription_Subscription;

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

export const OrderCreatedSubscriptionDocument = new TypedDocumentString(`
    subscription OrderCreatedSubscription {
  event {
    ... on OrderCreated {
      order {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<OrderCreatedSubscription, OrderCreatedSubscriptionVariables>;
export const OrderUpdatedSubscriptionDocument = new TypedDocumentString(`
    subscription OrderUpdatedSubscription {
  event {
    ... on OrderUpdated {
      order {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<OrderUpdatedSubscription, OrderUpdatedSubscriptionVariables>;