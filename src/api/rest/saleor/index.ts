import { type FastifyRequest } from "fastify";
import type { FastifyPluginAsync } from "fastify/types/plugin";

import { CONFIG } from "@/config";
import { ShippingMethodListForCheckoutSubscriptionDocument } from "@/graphql/operations/subscriptions/generated";
import { type AppManifestWebhook } from "@/graphql/schema";
import { saleorAppRouter } from "@/lib/saleor/apps/router";
import { getConfigProvider } from "@/providers/config";
import { getJWKSProvider } from "@/providers/jwks";
import { getSaleorClient } from "@/providers/saleorClient";

import { saleor } from "./saleor";
import { webhooks } from "./webhooks";

const getManifestWebhooks = (request: FastifyRequest): AppManifestWebhook[] => [
  {
    asyncEvents: [],
    name: "ShippingMethodListForCheckoutSubscription",
    query: ShippingMethodListForCheckoutSubscriptionDocument.toString(),
    syncEvents: ["SHIPPING_LIST_METHODS_FOR_CHECKOUT"],
    targetUrl: request.urlFor("saleor:webhooks:shipping-methods-for-checkout"),
  },
];

export const saleorRoutes: FastifyPluginAsync = async (
  fastify
): Promise<void> => {
  await Promise.all([
    fastify.register(saleorAppRouter, {
      getManifest: async ({ request }) => ({
        appUrl: request.urlFor("saleor:app"),
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
        webhooks: getManifestWebhooks(request),
      }),

      saleorUrl: CONFIG.SALEOR_URL,

      getRegisterProviders: async ({ authToken }) => ({
        configProvider: getConfigProvider({ server: fastify }),
        jwksProvider: getJWKSProvider(),
        saleorClient: getSaleorClient({
          logger: fastify.log,
          authToken,
          saleorUrl: CONFIG.SALEOR_URL,
        }),
      }),
    }),

    fastify.register(webhooks, { prefix: "/webhooks" }),
    fastify.register(saleor),
  ]);
};
