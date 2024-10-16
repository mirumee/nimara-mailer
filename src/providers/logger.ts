import { CONFIG } from "@/config";
import { createLogger } from "@/lib/plugins/winstonLoggingPlugin";

export const getLogger = () =>
  createLogger({
    environment: CONFIG.ENVIRONMENT,
    service: CONFIG.SERVICE,
  });
