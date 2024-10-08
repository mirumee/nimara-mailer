import { describe, expect, test, vi } from "vitest";

import * as auth from "@/lib/saleor/auth";
import { createServer } from "@/server";

describe("apiRoutes", () => {
  describe("/api/healthcheck", () => {
    test("200", async () => {
      const app = await createServer();
      const response = await app.inject({
        method: "GET",
        url: "/api/healthcheck",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual("ok");
    });
  });

  /**
   * TODO: Reuse when adding tests to `send-notification` endpoint.
   */
  describe.skip("/api/protected-route", () => {
    test("Should return 401 with invalid JWT.", async () => {
      // given
      const app = await createServer();
      const expectedStatusCode = 401;
      const expectedJson = {
        error: "UNAUTHORIZED",
        code: "UNAUTHORIZED_ERROR",
        requestId: expect.any(String),
        errors: [{ code: "ERR_JWT_INVALID", message: "Invalid JWT" }],
      };

      // when
      const response = await app.inject({
        method: "GET",
        url: "/api/protected-route",
        headers: {
          Authorization: "Bearer wrong",
        },
      });

      // then
      expect(response.json()).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });

    test.skip("Should return proper response.", async () => {
      const spy = vi.spyOn(auth, "verifyJWTSignature");
      const app = await createServer();
      const expectedJson = { status: "ok" };
      const expectedStatusCode = 200;

      // when
      spy.mockImplementation(async () => undefined);

      const response = await app.inject({
        method: "GET",
        url: "/api/protected-route",
        headers: {
          Authorization: "Bearer wrong",
        },
      });
      const json = response.json();

      // then
      expect(spy).toHaveBeenCalledOnce();
      expect(json).toStrictEqual(expectedJson);
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
    });
  });
});
