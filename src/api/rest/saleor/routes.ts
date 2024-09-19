import type { FastifyPluginAsync } from "fastify/types/plugin";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { CONFIG } from "@/config";
import { ShippingMethodListForCheckoutSubscriptionDocument } from "@/graphql/operations/subscriptions/generated";
import { installApp } from "@/lib/saleor/apps/install";
import { getSaleorClient } from "@/lib/saleor/client/provider";
import { getConfigProvider } from "@/lib/saleor/config/provider";
import { getJWKSProvider } from "@/lib/saleor/jwks/provider";
import { saleorHeaders } from "@/lib/saleor/schema";
import type { SaleorAppManifest } from "@/lib/saleor/types";

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/manifest",
    {
      name: "saleor:manifest",
    },
    async (request) => {
      const appManifest: SaleorAppManifest = {
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
        appUrl: `${request.appUrl}/`,
        tokenTargetUrl: request.urlFor("saleor:register"),
        webhooks: [
          {
            query: ShippingMethodListForCheckoutSubscriptionDocument.toString(),
            name: "ShippingMethodListForCheckoutSubscription",
            syncEvents: ["SHIPPING_LIST_METHODS_FOR_CHECKOUT"],
            asyncEvents: [],
            targetUrl: request.urlFor(
              "saleor:webhooks:shipping-methods-for-checkout"
            ),
          },
        ],
      };

      return appManifest;
    }
  );

  // https://pete.ngrok.dev/api/saleor/manifest
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/register",
    {
      name: "saleor:register",
      schema: {
        headers: saleorHeaders,
        body: z.object({
          auth_token: z.string(),
        }),
      },
    },
    async (request) => {
      const saleorAuthToken = request.body.auth_token;
      const saleorDomain = request.headers["saleor-domain"];

      const configProvider = getConfigProvider({ server: fastify });
      const jwksProvider = getJWKSProvider();
      const saleorClient = getSaleorClient({
        authToken: saleorAuthToken,
        saleorUrl: CONFIG.SALEOR_URL,
      });

      await installApp({
        saleorUrl: CONFIG.SALEOR_URL,
        jwksProvider,
        saleorClient,
        saleorDomain,
        saleorAuthToken,
        configProvider,
      });

      return { status: "ok" };
    }
  );
};
