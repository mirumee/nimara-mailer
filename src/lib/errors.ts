import { type FastifyError } from "@fastify/error";

import { type RequireAtLeastOne } from "@/lib/types";

interface BaseErrorOptions {
  cause?: { source?: Error } & Record<string, unknown>;
}

export class BaseError extends Error {
  constructor(message?: string, options?: BaseErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}

export class BaseAggregateError extends AggregateError {
  constructor(errors: Iterable<any>, message?: string) {
    super(errors, message);
    this.name = this.constructor.name;
  }
}

type WithSource = { source: FastifyError };
type WithError = RequireAtLeastOne<{
  code: string;
  message: string | object;
  statusCode: number;
}>;

export class HttpError extends BaseError {
  /**
   * https://github.com/Microsoft/TypeScript/issues/3841@/issuecomment-1488919713
   */
  declare ["constructor"]: typeof HttpError;

  /**
   * In JS we cannot override property in parent class 🤮,
   * thus we set a static property on a class, and in a constructor
   * it is rewritten to a instance property for proper error handling.
   */
  static statusCode = 500;
  static code = "INTERNAL_ERROR";
  static message = "Internal Server Error";

  statusCode: number;
  code: string;
  message: string;

  constructor(opts?: WithSource);
  constructor(opts?: WithError);
  constructor(opts?: WithSource | WithError) {
    super();

    this.statusCode = this.constructor.statusCode;

    if (opts && "source" in opts) {
      this.code = opts.source.code;
      this.message = opts.source.message;
    } else {
      this.code = (opts as WithError)?.code ?? this.constructor.code;
      this.statusCode =
        (opts as WithError)?.statusCode ?? this.constructor.statusCode;
      this.message = (() => {
        const message =
          (opts as WithError)?.message ?? this.constructor.message;
        return typeof message === "object" ? JSON.stringify(message) : message;
      })();
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends HttpError {
  static statusCode = 400;
  static code = "VALIDATION_ERROR";
  static message = "Bad request";
}

export class SaleorAppInstallationError extends HttpError {
  static code = "SALEOR_APP_INSTALLATION_ERROR";
  static message = "Application not available.";
}

export class UnauthorizedError extends HttpError {
  static statusCode = 401;
  static code = "UNAUTHORIZED_ERROR";
  static message = "You are unauthorized to preform this request.";
}
