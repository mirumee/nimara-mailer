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
        appUrl: `${request.appUrl}/`,
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
        tokenTargetUrl: request.urlFor("saleor:register"),
        version: CONFIG.VERSION,
        webhooks: [
          {
            asyncEvents: [],
            name: "ShippingMethodListForCheckoutSubscription",
            query: ShippingMethodListForCheckoutSubscriptionDocument.toString(),
            syncEvents: ["SHIPPING_LIST_METHODS_FOR_CHECKOUT"],
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
        body: z.object({
          auth_token: z.string(),
        }),
        headers: saleorHeaders,
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
        configProvider,
        jwksProvider,
        saleorAuthToken,
        saleorClient,
        saleorDomain,
        saleorUrl: CONFIG.SALEOR_URL,
      });

      return { status: "ok" };
    }
  );
};
