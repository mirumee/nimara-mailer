import { CONFIG } from "@/config";
import { JWKSMemoryProvider } from "@/lib/saleor/jwks/memory";

export const getJWKSProvider = () => {
  const remoteUrl = CONFIG.SALEOR_URL;

  return JWKSMemoryProvider({ remoteUrl });
};
