import { beforeEach, describe, expect, it, vi } from "vitest";

import { CONFIG } from "@/config";
import { EMAIL_EVENTS } from "@/const";
import * as validate from "@/lib/graphql/validate";
import * as auth from "@/lib/saleor/auth";
import { createServer } from "@/server";

describe("apiRoutes", () => {
  describe("/api/healthcheck", () => {
    it("200", async () => {
      const app = await createServer();
      const response = await app.inject({
        method: "GET",
        url: "/api/healthcheck",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual("ok");
    });
  });

  describe("/api/send-notification", () => {
    const url = "/api/send-notification";
    const sendSpy = vi.fn();

    let app: Awaited<ReturnType<typeof createServer>>;

    beforeEach(async () => {
      app = await createServer();
      app.sqs.send = sendSpy;
    });

    it("Should return 401 with invalid JWT.", async () => {
      // given
      const expectedStatusCode = 401;
      const expectedJson = {
        error: "UNAUTHORIZED",
        code: "UNAUTHORIZED_ERROR",
        requestId: expect.any(String),
        errors: [{ code: "ERR_JWT_INVALID", message: "Invalid JWT" }],
      };

      // when
      const response = await app.inject({
        method: "POST",
        url,
        headers: {
          Authorization: "Bearer wrong",
        },
        body: { data: {}, event: "account_confirmation_requested" },
      });

      // then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });

    it("Should return 401 with invalid config authorization token.", async () => {
      // given
      const expectedStatusCode = 401;
      const expectedJson = {
        error: "UNAUTHORIZED",
        code: "UNAUTHORIZED_ERROR",
        requestId: expect.any(String),
        errors: [{ message: "Invalid authorization token." }],
      };
      const event = EMAIL_EVENTS[0];

      vi.spyOn(CONFIG, "AUTHORIZATION_TOKEN", "get").mockReturnValue(
        "mocked-token"
      );

      // when
      const response = await app.inject({
        method: "POST",
        url,
        headers: {
          Authorization: "Bearer wrong",
        },
        body: { data: {}, event },
      });

      // then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });

    it("Should return 400 passed when event is not supported.", async () => {
      // given
      const expectedStatusCode = 400;
      const expectedJson = {
        code: "VALIDATION_ERROR",
        error: "BAD_REQUEST",
        requestId: expect.any(String),
        errors: [
          {
            code: "INVALID_ENUM_VALUE",
            context: "body > event",
            message: expect.any(String),
          },
        ],
      };

      // when
      const response = await app.inject({
        method: "POST",
        url,
        headers: {
          Authorization: expect.any(String),
        },
        body: { data: {}, event: "not_supported" },
      });

      // then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });

    it("Should return proper response.", async () => {
      const jwtVerifySpy = vi.spyOn(auth, "verifyJWTSignature");
      const validateSpy = vi.spyOn(validate, "validateDocumentAgainstData");
      const expectedJson = { status: "ok" };
      const expectedStatusCode = 200;
      const event = EMAIL_EVENTS[0];

      // when
      jwtVerifySpy.mockImplementation(async () => undefined);
      validateSpy.mockImplementation(() => ({ isValid: true, error: null }));

      const response = await app.inject({
        method: "POST",
        url,
        headers: {
          Authorization: expect.any(String),
        },
        body: {
          data: {},
          event,
        },
      });
      const json = response.json();

      // then
      expect(jwtVerifySpy).toHaveBeenCalledOnce();
      expect(validateSpy).toHaveBeenCalledOnce();
      expect(sendSpy).toHaveBeenCalledOnce();
      expect(json).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });
  });
});
