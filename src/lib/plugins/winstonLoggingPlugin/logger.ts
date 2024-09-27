import { type FastifyBaseLogger } from "fastify";
import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";

import { PLUGIN_CONFIG } from "./config";

export const createLogger = ({
  environment,
  service,
}: {
  environment: string;
  service: string;
}) => {
  const formatters = PLUGIN_CONFIG.IS_DEVELOPMENT
    ? [
        format.colorize(),
        format.printf((info) => {
          const { timestamp, message, level, ...args } = info;
          return `[${timestamp} ${level}]: ${message}\n${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
        }),
      ]
    : [format.json()];

  return createWinstonLogger({
    defaultMeta: {
      environment,
      nodeEvn: PLUGIN_CONFIG.NODE_ENV,
      service,
    },
    format: format.combine(
      format((info) => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      format.errors({ stack: true }),
      format.timestamp({
        format: "DD/MM/YYYY HH:mm:ss",
      }),
      ...formatters
    ),

    handleExceptions: false,
    level: PLUGIN_CONFIG.LOG_LEVEL,

    levels: {
      debug: 5,
      error: 1,
      fatal: 0,
      info: 3,
      trace: 4,
      warn: 2,
    },

    transports: [new transports.Console({ handleExceptions: true })],
  }) as unknown as FastifyBaseLogger;
  /**
   * Fastify defaults to pino.logger and has some problems with fatal & trace type compatibility.
   */
};
