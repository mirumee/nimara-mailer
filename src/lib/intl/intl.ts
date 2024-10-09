import { CONFIG } from "@/config";
import { type CountryCode } from "@/graphql/schema";

export const formatAsDateTime = ({
  locale = CONFIG.DEFAULT_LOCALE,
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
  locale = CONFIG.DEFAULT_LOCALE,
  date,
}: {
  date: string;
  locale: string;
}) => new Intl.DateTimeFormat(locale).format(new Date(date));

export const formatAsPrice = ({
  amount = 0,
  locale = CONFIG.DEFAULT_LOCALE,
  currency = CONFIG.DEFAULT_CURRENCY,
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
  locale = CONFIG.DEFAULT_LOCALE,
  currency = CONFIG.DEFAULT_CURRENCY,
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
  locale = CONFIG.DEFAULT_LOCALE,
  country,
}: {
  country: CountryCode | string;
  locale?: string;
}) => new Intl.DisplayNames(locale, { type: "region" }).of(country) as string;
