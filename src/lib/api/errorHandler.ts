import { STATUS_CODES } from "node:http";

import { type FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { JOSEError } from "jose/errors";

import { logger } from "@/server";

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

  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.status(statusCode).send({
      error,
      code: "VALIDATION_ERROR",
      requestId,
      errors: err.validation.map(({ message, keyword, params }) => ({
        code: formatCode(keyword),
        context: (err.validationContext
          ? [err.validationContext, ...params.issue.path]
          : params.issue.path
        ).join(" > "),
        message,
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
