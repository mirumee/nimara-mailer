import { CONFIG } from "@/config";

export const validateDomain = (saleorDomain: string) => {
  if (saleorDomain !== CONFIG.SALEOR_DOMAIN) {
    throw new Error(
      `This is a single tenant Saleor App and can only be used with  ${CONFIG.SALEOR_DOMAIN}.`
    );
  }
};
