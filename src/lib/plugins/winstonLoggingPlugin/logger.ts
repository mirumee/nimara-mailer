import { type FastifyBaseLogger } from "fastify";
import { klona } from "klona/full";
import traverse from "traverse";
import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";
import { consoleFormat } from "winston-console-format";

import { CONFIG } from "@/config";

import { PLUGIN_CONFIG } from "./config";

const REDACT_KEYS = [
  /^pw$/,
  /^password$/i,
  /^phone/i,
  /^secret/i,
  /email/i,
  /userEmail/i,
];

export type TransformFunction = Parameters<typeof format>[0];

export type TransformableInfo = Parameters<TransformFunction>[0];

export const redact: TransformFunction = (obj) => {
  const copy = klona(obj); // Making a deep copy to prevent side effects

  traverse(copy).forEach(function redactor() {
    const isSensitiveKey =
      this.key && REDACT_KEYS.some((regex) => regex.test(this.key!));

    if (isSensitiveKey) {
      this.update("*********");
    }
  });

  return copy;
};

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
            compact: false,
            sorted: true,
          },
        }),
      ]
    : [format.json()];

  return createWinstonLogger({
    defaultMeta: CONFIG.IS_DEVELOPMENT
      ? {}
      : {
          environment,
          nodeEvn: PLUGIN_CONFIG.NODE_ENV,
          service,
        },

    format: format.combine(
      format((info) => {
        info.level = `[${info.level.toUpperCase()}]`;
        return info;
      })(),
      format(redact)(),
      format.errors({ stack: true }),
      format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
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
};
