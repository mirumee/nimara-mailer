import { CONFIG } from "@/config";
import { createLogger } from "@/lib/plugins/winstonLoggingPlugin";

export const getLogger = (service: "emails-sender" | "events-receiver") =>
  createLogger({
    environment: CONFIG.ENVIRONMENT,
    service: `${CONFIG.NAME}/${service}@${CONFIG.VERSION}`,
  });
