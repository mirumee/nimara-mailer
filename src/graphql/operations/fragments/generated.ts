// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AddressFragment_Address_country_CountryDisplay = { code: string };

export type AddressFragment = { id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string | null, country: AddressFragment_Address_country_CountryDisplay };

export type CountryFragment = { code: string };

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
export const AddressFragment = new TypedDocumentString(`
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
}`, {"fragmentName":"AddressFragment"}) as unknown as TypedDocumentString<AddressFragment, unknown>;