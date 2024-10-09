import {
  formatAsCountry,
  formatAsDate,
  formatAsDateTime,
  formatAsPrice,
  formatAsPriceRange,
} from "./intl";
import { type OptsWithoutLocale } from "./types";

export const localizedFormatter = (locale: string) => ({
  dateTime: (opts: OptsWithoutLocale<typeof formatAsDateTime>) =>
    formatAsDateTime({ locale, ...opts }),
  date: (opts: OptsWithoutLocale<typeof formatAsDate>) =>
    formatAsDate({ locale, ...opts }),
  price: (opts: OptsWithoutLocale<typeof formatAsPrice>) =>
    formatAsPrice({ locale, ...opts }),
  priceRange: (opts: OptsWithoutLocale<typeof formatAsPriceRange>) =>
    formatAsPriceRange({ locale, ...opts }),
  country: (opts: OptsWithoutLocale<typeof formatAsCountry>) =>
    formatAsCountry({ locale, ...opts }),
});
