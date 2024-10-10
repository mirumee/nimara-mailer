import { type CountryCode } from "@/graphql/schema";

import { DEFAULT_REGION } from "../regions";

export const formatAsDateTime = ({
  locale = DEFAULT_REGION.locale,

  dateTime,
}: {
  dateTime: string;
  locale?: string;
}) =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(dateTime));

export const formatAsDate = ({
  locale = DEFAULT_REGION.locale,
  date,
}: {
  date: string;
  locale: string;
}) => new Intl.DateTimeFormat(locale).format(new Date(date));

export const formatAsPrice = ({
  amount = 0,
  locale = DEFAULT_REGION.locale,
  currency = DEFAULT_REGION.currency,
}: Partial<{
  amount: number;
  currency: string;
  locale: string;
}>) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);

export const formatAsPriceRange = ({
  start = 0,
  stop = 0,
  locale = DEFAULT_REGION.locale,
  currency = DEFAULT_REGION.currency,
}: Partial<{
  currency: string;
  locale: string;
  start: number;
  stop: number;
}>) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).formatRange(start, stop);

export const formatAsCountry = ({
  locale = DEFAULT_REGION.locale,

  country,
}: {
  country: CountryCode | string;
  locale?: string;
}) => new Intl.DisplayNames(locale, { type: "region" }).of(country) as string;
