import { type FastifyBaseLogger } from "fastify";
import winston from "winston";

import { CONFIG } from "@/config";

const formatters = CONFIG.IS_DEVELOPMENT
  ? [winston.format.json({ space: 2 }), winston.format.colorize({ all: true })]
  : [winston.format.json()];

export const logger = winston.createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5,
  },
  defaultMeta: {
    environment: CONFIG.ENVIRONMENT,
    nodeEnv: CONFIG.NODE_ENV,
    service: `${CONFIG.NAME}@${CONFIG.VERSION}`,
  },

  level: CONFIG.LOG_LEVEL,

  format: winston.format.combine(winston.format.timestamp(), ...formatters),
  transports: [new winston.transports.Console()],
}) as unknown as FastifyBaseLogger;
/**
 * Fastify defaults to pino.logger and has some problems with fatal & trace type compatibility.
 */
