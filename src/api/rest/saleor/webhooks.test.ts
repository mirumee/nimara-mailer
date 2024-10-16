import { JWTInvalid } from "jose/errors";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { CONFIG } from "@/config";
import { serializePayload } from "@/lib/emails/events/helpers";
import * as auth from "@/lib/saleor/auth";
import { createServer } from "@/server";

import { EVENT_HANDLERS } from "./webhooks";

describe("saleorWebhooksRoutes", () => {
  const sendSpy = vi.fn();
  const baseUrl = "/api/saleor/webhooks/email/";
  const jwtVerifySpy = vi.spyOn(auth, "verifyWebhookSignature");

  let app: Awaited<ReturnType<typeof createServer>>;

  beforeEach(async () => {
    app = await createServer();
    app.sqs.send = sendSpy;
  });

  describe("/api/saleor/webhooks/email/*", () => {
    test.each(EVENT_HANDLERS)(
      "should register route for $event event",
      ({ event }) => {
        // Given
        const url = `${baseUrl}${event.toLowerCase().replaceAll("_", "-")}`;

        // When & Then
        expect(
          app.hasRoute({
            url,
            method: "POST",
          })
        ).toBeTruthy();
      }
    );

    test("require saleor headers", async () => {
      // Given
      const url = `${baseUrl}account-confirmed`;
      const expectedStatusCode = 400;
      const expectedJson = {
        error: "BAD_REQUEST",
        code: "VALIDATION_ERROR",
        requestId: expect.any(String),
        errors: [
          {
            code: "INVALID_TYPE",
            context: "headers > saleor-event",
            message: "Required",
          },
          {
            code: "INVALID_TYPE",
            context: "headers > saleor-signature",
            message: "Required",
          },
          {
            code: "INVALID_TYPE",
            context: "headers > saleor-domain",
            message: "Required",
          },
          {
            code: "INVALID_TYPE",
            context: "headers > saleor-api-url",
            message: "Required",
          },
        ],
      };

      // When
      const response = await app.inject({
        method: "POST",
        url,
        headers: {},
        body: { data: {} },
      });

      // Then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });

    test("is protected by JWT", async () => {
      // Given
      const url = `${baseUrl}account-confirmed`;
      const expectedStatusCode = 401;
      const expectedMessage = "You shall not pass!";
      const expectedJson = {
        error: "UNAUTHORIZED",
        code: "UNAUTHORIZED_ERROR",
        requestId: expect.any(String),
        errors: [{ code: "ERR_JWT_INVALID", message: expectedMessage }],
      };

      // When
      jwtVerifySpy.mockImplementation(async () => {
        throw new JWTInvalid(expectedMessage);
      });

      const response = await app.inject({
        method: "POST",
        url,
        headers: {
          "saleor-event": "account_confirmed",
          "saleor-signature": "wrong",
          "saleor-domain": "mirumee.com",
          "saleor-api-url": "https://mirumee.com",
        },
        body: { data: {} },
      });

      // Then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });

    test("it should send SQS message with proper payload", async () => {
      // Given
      const url = `${baseUrl}account-confirmed`;
      const event = "account_confirmed";
      const expectedStatusCode = 200;
      const expectedJson = { status: "ok" };
      const payload = { "nimara-mailer": "is the best" };
      const expectedSQSCommandData = {
        input: {
          QueueUrl: CONFIG.SQS_QUEUE_URL,
          MessageBody: JSON.stringify(
            serializePayload({ data: payload, event })
          ),
        },
      };

      // When
      jwtVerifySpy.mockImplementation(async () => undefined);

      const response = await app.inject({
        method: "POST",
        url,
        headers: {
          "saleor-event": event,
          "saleor-signature": "signature",
          "saleor-domain": "mirumee.com",
          "saleor-api-url": "https://mirumee.com",
        },
        body: payload,
      });

      // Then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining(expectedSQSCommandData)
      );
    });
  });
});
