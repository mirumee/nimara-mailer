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
        id: CONFIG.NAME,
        permissions: [
          "MANAGE_PRODUCTS",
          "MANAGE_CHECKOUTS",
          "IMPERSONATE_USER",
          "HANDLE_PAYMENTS",
          "MANAGE_SHIPPING",
        ],
        name: CONFIG.NAME,
        version: CONFIG.VERSION,
        about: CONFIG.ABOUT,
        dataPrivacyUrl: "https://mirumee.com/",
        homepageUrl: "https://mirumee.com/",
        supportUrl: "https://mirumee.com/",
        appUrl: "http://localhost:80/",
        tokenTargetUrl: "http://localhost:80/api/saleor/register",
        webhooks: [
          {
            query: ShippingMethodListForCheckoutSubscriptionDocument.toString(),
            name: "ShippingMethodListForCheckoutSubscription",
            syncEvents: ["SHIPPING_LIST_METHODS_FOR_CHECKOUT"],
            asyncEvents: [],
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
        method: "POST",
        url: "/api/saleor/register",
        payload: {
          auth_token: "token",
        },
        headers: {
          "saleor-api-url": "url",
          "saleor-domain": "domain",
        },
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
        error: "BAD_REQUEST",
        code: "VALIDATION_ERROR",
        requestId: expect.any(String),
        errors: [
          {
            code: "INVALID_TYPE",
            message: "Required",
            context: "headers > saleor-domain",
          },
          {
            code: "INVALID_TYPE",
            message: "Required",
            context: "headers > saleor-api-url",
          },
        ],
      };

      // When
      const response = await app.inject({
        method: "POST",
        url: "/api/saleor/register",
        payload: {
          auth_token: "Saleor token",
        },
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
        error: "BAD_REQUEST",
        code: "VALIDATION_ERROR",
        requestId: expect.any(String),
        errors: [
          {
            code: "INVALID_TYPE",
            message: "Expected object, received null",
            context: "body",
          },
        ],
      };

      // When
      const response = await app.inject({
        method: "POST",
        url: "/api/saleor/register",
        headers: {
          "saleor-api-url": "url",
          "saleor-domain": "domain",
        },
      });

      // Then
      expect(response.statusCode).toStrictEqual(expectedStatusCode);
      expect(response.json()).toStrictEqual(expectedJson);
    });
  });
});
