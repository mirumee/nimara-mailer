// @ts-nocheck
// prettier-ignore
/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
import type * as Types from '../../schema';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AddressFragment_Address_country_CountryDisplay = { code: string };

export type AddressFragment = { id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string | null, country: AddressFragment_Address_country_CountryDisplay };

export type ChannelFragment = { slug: string };

export type CountryFragment = { code: string };

export type ImageFragment = { url: string };

export type MoneyFragment = { amount: number, currency: string };

export type OrderBaseFragment_Order_channel_Channel = { slug: string };

export type OrderBaseFragment_Order_user_User = { firstName: string };

export type OrderBaseFragment_Order_shippingAddress_Address = { id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string | null, country: AddressFragment_Address_country_CountryDisplay };

export type OrderBaseFragment = { number: string, displayGrossPrices: boolean, languageCodeEnum: Types.LanguageCodeEnum, userEmail: string | null, channel: OrderBaseFragment_Order_channel_Channel, user: OrderBaseFragment_Order_user_User | null, shippingAddress: OrderBaseFragment_Order_shippingAddress_Address | null };

export type OrderFragment_Order_shippingPrice_TaxedMoney_net_Money = { amount: number, currency: string };

export type OrderFragment_Order_shippingPrice_TaxedMoney = { net: OrderFragment_Order_shippingPrice_TaxedMoney_net_Money };

export type OrderFragment_Order_subtotal_TaxedMoney_net_Money = { amount: number, currency: string };

export type OrderFragment_Order_subtotal_TaxedMoney = { net: OrderFragment_Order_subtotal_TaxedMoney_net_Money };

export type OrderFragment_Order_total_TaxedMoney_gross_Money = { amount: number, currency: string };

export type OrderFragment_Order_total_TaxedMoney = { gross: OrderFragment_Order_total_TaxedMoney_gross_Money };

export type OrderFragment_Order_lines_OrderLine_thumbnail_Image = { url: string };

export type OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney_gross_Money = { amount: number, currency: string };

export type OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney_net_Money = { amount: number, currency: string };

export type OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney = { gross: OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney_gross_Money, net: OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney_net_Money };

export type OrderFragment_Order_lines_OrderLine_variant_ProductVariant_product_Product = { slug: string };

export type OrderFragment_Order_lines_OrderLine_variant_ProductVariant = { product: OrderFragment_Order_lines_OrderLine_variant_ProductVariant_product_Product };

export type OrderFragment_Order_lines_OrderLine = { quantity: number, variantName: string, productName: string, thumbnail: OrderFragment_Order_lines_OrderLine_thumbnail_Image | null, unitPrice: OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney, variant: OrderFragment_Order_lines_OrderLine_variant_ProductVariant | null };

export type OrderFragment = { number: string, displayGrossPrices: boolean, languageCodeEnum: Types.LanguageCodeEnum, userEmail: string | null, shippingPrice: OrderFragment_Order_shippingPrice_TaxedMoney, subtotal: OrderFragment_Order_subtotal_TaxedMoney, total: OrderFragment_Order_total_TaxedMoney, lines: Array<OrderFragment_Order_lines_OrderLine>, channel: OrderBaseFragment_Order_channel_Channel, user: OrderBaseFragment_Order_user_User | null, shippingAddress: OrderBaseFragment_Order_shippingAddress_Address | null };

export type OrderLineFragment = { quantity: number, variantName: string, productName: string, thumbnail: OrderFragment_Order_lines_OrderLine_thumbnail_Image | null, unitPrice: OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney, variant: OrderFragment_Order_lines_OrderLine_variant_ProductVariant | null };

export type TaxedMoneyFragment = { gross: OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney_gross_Money, net: OrderFragment_Order_lines_OrderLine_unitPrice_TaxedMoney_net_Money };

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
export const OrderFragment = new TypedDocumentString(`
    fragment OrderFragment on Order {
  ...OrderBaseFragment
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
fragment ChannelFragment on Channel {
  slug
}
fragment CountryFragment on CountryDisplay {
  code
}
fragment ImageFragment on Image {
  url
}
fragment MoneyFragment on Money {
  amount
  currency
}
fragment OrderBaseFragment on Order {
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
}
fragment OrderLineFragment on OrderLine {
  quantity
  variantName
  productName
  thumbnail(format: ORIGINAL, size: 64) {
    ...ImageFragment
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
fragment TaxedMoneyFragment on TaxedMoney {
  gross {
    ...MoneyFragment
  }
  net {
    ...MoneyFragment
  }
}`, {"fragmentName":"OrderFragment"}) as unknown as TypedDocumentString<OrderFragment, unknown>;