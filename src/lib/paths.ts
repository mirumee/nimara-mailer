import { CONFIG } from "@/config";

const BASE = CONFIG.STOREFRONT_URL;

export const getPaths = (id: string) => ({
  home: () => `${BASE}/${id}`,
  product: ({ slug }: { slug: string }) => `${BASE}/${id}/products/${slug}`,
  terms: () => `${BASE}/${id}/terms-of-use`,
  privacyPolicy: () => `${BASE}/${id}/privacy-policy`,
});

export type Paths = ReturnType<typeof getPaths>;
