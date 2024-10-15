import { CONFIG } from "@/config";

export type Region = {
  channel: string;
  countryCode: string;
  currency: string;
  id: string;
  locale: string;
};

export const REGIONS: Record<string, Region> = {
  US: {
    id: "us",
    channel: "channel-us",
    countryCode: "US",
    currency: "USD",
    locale: "en-US",
  },
  GB: {
    id: "gb",
    channel: "channel-uk",
    countryCode: "GB",
    currency: "GBP",
    locale: "en-GB",
  },
};

export const DEFAULT_REGION = REGIONS[CONFIG.DEFAULT_REGION];

export const getRegion = (slug: string): Region => {
  const region =
    Object.values(REGIONS).find(({ channel }) => channel === slug) ??
    REGIONS[CONFIG.DEFAULT_REGION];

  if (!region) {
    throw new Error(`Region not found for channel slug ${slug}.`);
  }

  return region;
};
