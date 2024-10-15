import { type FastifyBaseLogger } from "fastify";
import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";
import { consoleFormat } from "winston-console-format";

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
        consoleFormat({
          showMeta: true,
          metaStrip: ["timestamp"],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
            sorted: true,
          },
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
        info.level = `[${info.level.toUpperCase()}]`;
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

    transports: [
      new transports.Console({ debugStdout: true, handleExceptions: true }),
    ],
  }) as unknown as FastifyBaseLogger;
  /**
   * Fastify defaults to pino.logger and has some problems with fatal & trace type compatibility.
   */
};
