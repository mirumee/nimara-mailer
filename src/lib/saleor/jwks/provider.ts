import { CONFIG } from "@/config";

import { JWKSMemoryProvider } from "./memory";

export const getJWKSProvider = () => {
  const remoteUrl = CONFIG.SALEOR_URL;

  return JWKSMemoryProvider({ remoteUrl });
};
