import { STATUS_CODES } from "node:http";

import { type FastifyInstance } from "fastify";
import { JOSEError } from "jose/errors";
import { ZodError } from "zod";

import { logger } from "@/lib/logger";

const formatCode = (code: number | string) =>
  code.toString().toUpperCase().replaceAll(" ", "_");

export const errorHandler: FastifyInstance["errorHandler"] = (
  err,
  request,
  reply
) => {
  let statusCode = err.statusCode ?? 500;
  let error = formatCode(STATUS_CODES[statusCode]!);
  const requestId = request.id;

  /**
   * Rethrow jose errors as 401 unauthorized.
   */
  if (err instanceof JOSEError) {
    statusCode = 401;
    error = formatCode(STATUS_CODES[statusCode]!);

    return reply.status(statusCode).send({
      error,
      code: "UNAUTHORIZED_ERROR",
      requestId,
      errors: [
        {
          code: formatCode(err.code),
          message: err.message,
        },
      ],
    });
  }

  /**
   * Fastify by default stringifies responses which makes the message really ugly.
   * https://github.com/turkerdev/fastify-type-provider-zod/issues/26
   * Additionally, add validation context if present to point the source of the error.
   * TODO: Maybe serialize message to proper text instead of stringified object?
   */
  if (err instanceof ZodError) {
    return reply.status(statusCode).send({
      error,
      code: "VALIDATION_ERROR",
      requestId,
      errors: err.issues.map(({ code, message, path }) => ({
        code: formatCode(code),
        message,
        context: [err.validationContext, ...path].join(" > "),
      })),
    });
  }

  if (err?.stack) {
    logger.error(err.message, {
      stack: err.stack,
      cause: err.cause,
      err: err.name,
    });
  }

  /**
   * Default behaviour
   */
  return reply.status(statusCode).send({
    error,
    code: err?.code ?? "SERVER_ERROR",
    requestId,
    errors: [
      {
        message: err?.message,
      },
    ],
  });
};
