import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type ShippingMethodListForCheckoutSubscription_event_ShippingListMethodsForCheckout_checkout_Checkout = { id: string };

export type ShippingMethodListForCheckoutSubscription_event_ShippingListMethodsForCheckout = { checkout: ShippingMethodListForCheckoutSubscription_event_ShippingListMethodsForCheckout_checkout_Checkout | null };

export type ShippingMethodListForCheckoutSubscription_Subscription = { event: ShippingMethodListForCheckoutSubscription_event_ShippingListMethodsForCheckout | null };


export type ShippingMethodListForCheckoutSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ShippingMethodListForCheckoutSubscription = ShippingMethodListForCheckoutSubscription_Subscription;

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

export const ShippingMethodListForCheckoutSubscriptionDocument = new TypedDocumentString(`
    subscription ShippingMethodListForCheckoutSubscription {
  event {
    ...ShippingListMethodsForCheckoutFragment
  }
}
    fragment ShippingListMethodsForCheckoutFragment on ShippingListMethodsForCheckout {
  checkout {
    id
  }
}`) as unknown as TypedDocumentString<ShippingMethodListForCheckoutSubscription, ShippingMethodListForCheckoutSubscriptionVariables>;