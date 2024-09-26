import { CONFIG } from "@/config";
import { createLogger } from "@/lib/plugins/winstonLoggingPlugin";

export const logger = createLogger({
  environment: CONFIG.ENVIRONMENT,
  service: CONFIG.RELEASE,
});
