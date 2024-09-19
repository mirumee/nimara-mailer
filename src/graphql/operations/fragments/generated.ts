import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type ShippingListMethodsForCheckoutFragment_ShippingListMethodsForCheckout_checkout_Checkout = { id: string };

export type ShippingListMethodsForCheckoutFragment = { checkout: ShippingListMethodsForCheckoutFragment_ShippingListMethodsForCheckout_checkout_Checkout | null };

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
export const ShippingListMethodsForCheckoutFragment = new TypedDocumentString(`
    fragment ShippingListMethodsForCheckoutFragment on ShippingListMethodsForCheckout {
  checkout {
    id
  }
}
    `, {"fragmentName":"ShippingListMethodsForCheckoutFragment"}) as unknown as TypedDocumentString<ShippingListMethodsForCheckoutFragment, unknown>;