import { type FastifyBaseLogger } from "fastify";
import winston from "winston";

import { PLUGIN_CONFIG } from "./config";

export const createLogger = ({
  environment,
  service,
}: {
  environment: string;
  service: string;
}) => {
  const formatters = PLUGIN_CONFIG.IS_DEVELOPMENT
    ? [winston.format.prettyPrint({ colorize: true })]
    : [winston.format.json()];

  return winston.createLogger({
    defaultMeta: {
      environment,
      nodeEvn: PLUGIN_CONFIG.NODE_ENV,
      service,
    },
    format: winston.format.combine(winston.format.timestamp(), ...formatters),

    level: PLUGIN_CONFIG.LOG_LEVEL,

    levels: {
      debug: 5,
      error: 1,
      fatal: 0,
      info: 3,
      trace: 4,
      warn: 2,
    },
    transports: [new winston.transports.Console()],
  }) as unknown as FastifyBaseLogger;
  /**
   * Fastify defaults to pino.logger and has some problems with fatal & trace type compatibility.
   */
};
