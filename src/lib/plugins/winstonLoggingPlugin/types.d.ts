import { FastifyBaseLogger, FastifyInstance } from "fastify";
import { type LeveledLogMethod } from "winston";

declare module fastify {
  interface FastifyBaseLogger {
    debug: LeveledLogMethod;
    error: LeveledLogMethod;
    fatal: LeveledLogMethod;
    info: LeveledLogMethod;
    trace: LeveledLogMethod;
    warn: LeveledLogMethod;
  }
}
