import { describe, expect, test, vi } from "vitest";

import { CONFIG } from "@/config";
import { ShippingMethodListForCheckoutSubscriptionDocument } from "@/graphql/operations/subscriptions/generated";
import { createServer } from "@/server";

describe("apiRoutes", () => {
  describe("/manifest", () => {
    test("Returns proper response.", async () => {
      // Given
      const app = await createServer();
      const expectedJson = {
        appUrl: "http://localhost:80/",
        homepageUrl: "https://mirumee.com/",
        id: CONFIG.NAME,
        name: CONFIG.NAME,
        permissions: [
          "MANAGE_PRODUCTS",
          "MANAGE_CHECKOUTS",
          "IMPERSONATE_USER",
          "HANDLE_PAYMENTS",
          "MANAGE_SHIPPING",
        ],
        tokenTargetUrl: "http://localhost:80/api/saleor/register",
        version: CONFIG.VERSION,
        webhooks: [
          {
            asyncEvents: [],
            name: "ShippingMethodListForCheckoutSubscription",
            query: ShippingMethodListForCheckoutSubscriptionDocument.toString(),
            syncEvents: ["SHIPPING_LIST_METHODS_FOR_CHECKOUT"],
            targetUrl:
              "http://localhost:80/api/saleor/webhooks/shipping-methods-for-checkout",
          },
        ],
      };

      // When
      const response = await app.inject({
        method: "GET",
        url: "/api/saleor/manifest",
      });

      // Then
      expect(response.statusCode).toBe(200);
      expect(response.json()).toStrictEqual(expectedJson);
    });
  });

  describe("/register", () => {
    test("Return proper response.", async () => {
      // Given
      const app = await createServer();
      const expectedStatusCode = 200;
      const expectedJson = { status: "ok" };

      vi.mock("@/lib/saleor/jwks/provider");
      vi.mock("@/lib/saleor/client/provider");
      vi.mock("@/lib/saleor/config/provider");
      vi.mock("@/lib/saleor/apps/install");

      // When
      const response = await app.inject({
        headers: {
          "saleor-api-url": "url",
          "saleor-domain": "domain",
        },
        method: "POST",
        payload: {
          auth_token: "token",
        },
        url: "/api/saleor/register",
      });

      // Then
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
      expect(response.json()).toStrictEqual(expectedJson);
    });

    test("Validates proper request headers.", async () => {
      // Given
      const app = await createServer();
      const expectedStatusCode = 400;
      const expectedJson = {
        code: "VALIDATION_ERROR",
        error: "BAD_REQUEST",
        errors: [
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
        requestId: expect.any(String),
      };

      // When
      const response = await app.inject({
        method: "POST",
        payload: {
          auth_token: "Saleor token",
        },
        url: "/api/saleor/register",
      });

      // then
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
      expect(response.json()).toStrictEqual(expectedJson);
    });

    test("Validates proper request payload.", async () => {
      // Given
      const app = await createServer();
      const expectedStatusCode = 400;
      const expectedJson = {
        code: "VALIDATION_ERROR",
        error: "BAD_REQUEST",
        errors: [
          {
            code: "INVALID_TYPE",
            context: "body",
            message: "Expected object, received null",
          },
        ],
        requestId: expect.any(String),
      };

      // When
      const response = await app.inject({
        headers: {
          "saleor-api-url": "url",
          "saleor-domain": "domain",
        },
        method: "POST",
        url: "/api/saleor/register",
      });

      // Then
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
      expect(response.json()).toStrictEqual(expectedJson);
    });
  });
});
