// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '@nimara-mailer/codegen/schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AddressFragment_Address_country_CountryDisplay = { code: string };

export type AddressFragment = { id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string | null, isDefaultBillingAddress: boolean | null, isDefaultShippingAddress: boolean | null, country: AddressFragment_Address_country_CountryDisplay };

export type AttributeFragment_Attribute_translation_AttributeTranslation = { name: string };

export type AttributeFragment = { name: string | null, slug: string | null, inputType: Types.AttributeInputTypeEnum | null, translation: AttributeFragment_Attribute_translation_AttributeTranslation | null };

export type AttributeValueFragment_AttributeValue_translation_AttributeValueTranslation = { name: string, richText: string | null, plainText: string | null };

export type AttributeValueFragment = { id: string, slug: string | null, name: string | null, richText: string | null, plainText: string | null, boolean: boolean | null, date: string | null, dateTime: string | null, value: string | null, translation: AttributeValueFragment_AttributeValue_translation_AttributeValueTranslation | null };

export type ChannelFragment = { slug: string };

export type ChannelWithCodeFragment_Channel_defaultCountry_CountryDisplay = { code: string };

export type ChannelWithCodeFragment = { slug: string, defaultCountry: ChannelWithCodeFragment_Channel_defaultCountry_CountryDisplay };

export type CountryFragment = { code: string };

export type GiftCardFragment_GiftCard_currentBalance_Money = { amount: number, currency: string };

export type GiftCardFragment = { displayCode: string, id: string, isActive: boolean, currentBalance: GiftCardFragment_GiftCard_currentBalance_Money };

export type ImageFragment = { alt: string | null, url: string };

export type MetadataItemFragment = { value: string, key: string };

export type MoneyFragment = { amount: number, currency: string };

export type PageInfoFragment = { hasNextPage: boolean, hasPreviousPage: boolean, endCursor: string | null, startCursor: string | null };

export type ProductMediaFragment = { alt: string, type: Types.ProductMediaType, thumbnail: string };

export type ProductPriceFragment_ProductPricingInfo_discount_TaxedMoney = { currency: string };

export type ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_gross_Money = { amount: number, currency: string };

export type ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_net_Money = { amount: number, currency: string };

export type ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney = { gross: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_gross_Money, net: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_net_Money };

export type ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_stop_TaxedMoney = { gross: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_gross_Money, net: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_net_Money };

export type ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange = { start: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney | null, stop: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_stop_TaxedMoney | null };

export type ProductPriceFragment_ProductPricingInfo_priceRangeUndiscounted_TaxedMoneyRange = { start: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney | null, stop: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_stop_TaxedMoney | null };

export type ProductPriceFragment = { onSale: boolean | null, displayGrossPrices: boolean, discount: ProductPriceFragment_ProductPricingInfo_discount_TaxedMoney | null, priceRange: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange | null, priceRangeUndiscounted: ProductPriceFragment_ProductPricingInfo_priceRangeUndiscounted_TaxedMoneyRange | null };

export type ShippingMethodFragment_ShippingMethod_translation_ShippingMethodTranslation = { name: string | null, description: string | null };

export type ShippingMethodFragment_ShippingMethod_price_Money = { amount: number, currency: string };

export type ShippingMethodFragment = (
  { id: string, name: string, description: string | null, minimumDeliveryDays: number | null, maximumDeliveryDays: number | null, translation: ShippingMethodFragment_ShippingMethod_translation_ShippingMethodTranslation | null, price: ShippingMethodFragment_ShippingMethod_price_Money }
  & { __typename: 'ShippingMethod' }
);

export type TaxedMoneyFragment = { gross: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_gross_Money, net: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney_net_Money };

export type TaxedRangePriceFragment = { start: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_start_TaxedMoney | null, stop: ProductPriceFragment_ProductPricingInfo_priceRange_TaxedMoneyRange_stop_TaxedMoney | null };

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
  isDefaultBillingAddress
  isDefaultShippingAddress
}
    fragment CountryFragment on CountryDisplay {
  code
}`, {"fragmentName":"AddressFragment"}) as unknown as TypedDocumentString<AddressFragment, unknown>;
export const AttributeFragment = new TypedDocumentString(`
    fragment AttributeFragment on Attribute {
  name
  slug
  translation(languageCode: $languageCode) {
    name
  }
  inputType
  slug
}
    `, {"fragmentName":"AttributeFragment"}) as unknown as TypedDocumentString<AttributeFragment, unknown>;
export const AttributeValueFragment = new TypedDocumentString(`
    fragment AttributeValueFragment on AttributeValue {
  id
  slug
  name
  translation(languageCode: $languageCode) {
    name
    richText
    plainText
  }
  richText
  plainText
  boolean
  date
  dateTime
  value
}
    `, {"fragmentName":"AttributeValueFragment"}) as unknown as TypedDocumentString<AttributeValueFragment, unknown>;
export const ChannelWithCodeFragment = new TypedDocumentString(`
    fragment ChannelWithCodeFragment on Channel {
  defaultCountry {
    code
  }
  ...ChannelFragment
}
    fragment ChannelFragment on Channel {
  slug
}`, {"fragmentName":"ChannelWithCodeFragment"}) as unknown as TypedDocumentString<ChannelWithCodeFragment, unknown>;
export const GiftCardFragment = new TypedDocumentString(`
    fragment GiftCardFragment on GiftCard {
  displayCode
  id
  isActive
  currentBalance {
    ...MoneyFragment
  }
}
    fragment MoneyFragment on Money {
  amount
  currency
}`, {"fragmentName":"GiftCardFragment"}) as unknown as TypedDocumentString<GiftCardFragment, unknown>;
export const ImageFragment = new TypedDocumentString(`
    fragment ImageFragment on Image {
  alt
  url
}
    `, {"fragmentName":"ImageFragment"}) as unknown as TypedDocumentString<ImageFragment, unknown>;
export const MetadataItemFragment = new TypedDocumentString(`
    fragment MetadataItemFragment on MetadataItem {
  value
  key
}
    `, {"fragmentName":"MetadataItemFragment"}) as unknown as TypedDocumentString<MetadataItemFragment, unknown>;
export const PageInfoFragment = new TypedDocumentString(`
    fragment PageInfoFragment on PageInfo {
  hasNextPage
  hasPreviousPage
  endCursor
  startCursor
}
    `, {"fragmentName":"PageInfoFragment"}) as unknown as TypedDocumentString<PageInfoFragment, unknown>;
export const ProductMediaFragment = new TypedDocumentString(`
    fragment ProductMediaFragment on ProductMedia {
  alt
  type
  thumbnail: url(size: $thumbnailSize, format: $thumbnailFormat)
}
    `, {"fragmentName":"ProductMediaFragment"}) as unknown as TypedDocumentString<ProductMediaFragment, unknown>;
export const ProductPriceFragment = new TypedDocumentString(`
    fragment ProductPriceFragment on ProductPricingInfo {
  onSale
  displayGrossPrices
  discount {
    currency
  }
  priceRange {
    ...TaxedRangePriceFragment
  }
  priceRangeUndiscounted {
    ...TaxedRangePriceFragment
  }
}
    fragment MoneyFragment on Money {
  amount
  currency
}
fragment TaxedMoneyFragment on TaxedMoney {
  gross {
    ...MoneyFragment
  }
  net {
    ...MoneyFragment
  }
}
fragment TaxedRangePriceFragment on TaxedMoneyRange {
  start {
    ...TaxedMoneyFragment
  }
  stop {
    ...TaxedMoneyFragment
  }
}`, {"fragmentName":"ProductPriceFragment"}) as unknown as TypedDocumentString<ProductPriceFragment, unknown>;
export const ShippingMethodFragment = new TypedDocumentString(`
    fragment ShippingMethodFragment on ShippingMethod {
  __typename
  id
  name
  description
  translation(languageCode: $languageCode) {
    name
    description
  }
  minimumDeliveryDays
  maximumDeliveryDays
  price {
    ...MoneyFragment
  }
}
    fragment MoneyFragment on Money {
  amount
  currency
}`, {"fragmentName":"ShippingMethodFragment"}) as unknown as TypedDocumentString<ShippingMethodFragment, unknown>;