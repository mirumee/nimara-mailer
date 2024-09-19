import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { decodeJwt } from "jose";
import { describe, expect, test } from "vitest";
import { z } from "zod";

import { HttpError, UnauthorizedError, ValidationError } from "@/lib/errors";
import { createServer } from "@/server";

describe("errorHandler", () => {
  test("Default error handling", async () => {
    // Given
    const expectedMessage = "Oh snap";
    const expectedStatusCode = 500;
    const expectedJson = {
      code: "SERVER_ERROR",
      error: "INTERNAL_SERVER_ERROR",
      errors: [{ message: expectedMessage }],
      requestId: expect.any(String),
    };
    const app = await createServer();

    // When
    app.get("/test", () => {
      throw new Error(expectedMessage);
    });
    const response = await app.inject({
      method: "GET",
      url: "/test",
    });

    // Then
    expect(response.json()).toStrictEqual(expectedJson);
    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test("ZodError errors handling", async () => {
    // Given
    const expectedStatusCode = 400;
    const expectedJson = {
      code: "VALIDATION_ERROR",
      error: "BAD_REQUEST",
      errors: [
        {
          code: "INVALID_TYPE",
          context: "headers > authorization",
          message: "Required",
        },
      ],
      requestId: expect.any(String),
    };
    const app = await createServer();

    // When
    app.withTypeProvider<ZodTypeProvider>().get(
      "/test",
      {
        schema: {
          headers: z.object({ authorization: z.string() }),
        },
      },
      () => null
    );
    const response = await app.inject({
      method: "GET",
      url: "/test",
    });

    // Then
    expect(response.json()).toStrictEqual(expectedJson);
    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test("Jose errors handling", async () => {
    // Given
    const expectedStatusCode = 401;
    const expectedJson = {
      code: "UNAUTHORIZED_ERROR",
      error: "UNAUTHORIZED",
      errors: [{ code: "ERR_JWT_INVALID", message: "Invalid JWT" }],
      requestId: expect.any(String),
    };
    const app = await createServer();

    // When
    app.post("/test", () => decodeJwt("ops"));
    const response = await app.inject({
      method: "POST",
      url: "/test",
    });

    // Then
    expect(response.json()).toStrictEqual(expectedJson);
    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test.each([
    {
      error: new UnauthorizedError({ message: "You have no power here!" }),
      json: {
        code: "UNAUTHORIZED_ERROR",
        error: "UNAUTHORIZED",
        errors: [{ message: "You have no power here!" }],
        requestId: expect.any(String),
      },
      statusCode: 401,
    },
    {
      error: new ValidationError({ message: "What are you doing?" }),
      json: {
        code: "VALIDATION_ERROR",
        error: "BAD_REQUEST",
        errors: [{ message: "What are you doing?" }],
        requestId: expect.any(String),
      },
      statusCode: 400,
    },
    {
      error: new HttpError({ message: "Ops! I did it again!" }),
      json: {
        code: "INTERNAL_ERROR",
        error: "INTERNAL_SERVER_ERROR",
        errors: [{ message: "Ops! I did it again!" }],
        requestId: expect.any(String),
      },
      statusCode: 500,
    },
  ])(
    `Custom error > $error.constructor.name`,
    async ({ error, json, statusCode }) => {
      // Given
      const app = await createServer();

      // When
      app.post("/test", () => {
        throw error;
      });
      const response = await app.inject({ method: "POST", url: "/test" });

      // Then
      expect(response.json()).toStrictEqual(json);
      expect(response.statusCode).toBe(statusCode);
    }
  );
});
