import { type FastifyRequest } from "fastify";
import type { FastifyPluginAsync } from "fastify/types/plugin";

import { CONFIG } from "@/config";
import {
  type AppManifestWebhook,
  type WebhookEventTypeAsyncEnum,
} from "@/graphql/schema";
import { saleorAppRouter } from "@/lib/saleor/apps/router";
import { getConfigProvider } from "@/providers/config";
import { getJWKSProvider } from "@/providers/jwks";
import { getSaleorClient } from "@/providers/saleorClient";

import { saleorRestRoutes } from "./saleor";
import { SALEOR_EVENTS_MAP, saleorWebhooksRoutes } from "./webhooks";

const getManifestWebhooks = (request: FastifyRequest): AppManifestWebhook[] =>
  SALEOR_EVENTS_MAP.map(({ event, query }) => {
    const name = event.replaceAll("_", "-");

    return {
      asyncEvents: [event.toUpperCase() as WebhookEventTypeAsyncEnum],
      name,
      query,
      syncEvents: [],
      targetUrl: request.urlFor(`saleor:webhooks:email:${name}`),
    };
  });

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
          "IMPERSONATE_USER",
          "MANAGE_GIFT_CARD",
          "MANAGE_ORDERS",
          "MANAGE_PRODUCTS",
          "MANAGE_SHIPPING",
          "MANAGE_USERS",
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

    fastify.register(saleorWebhooksRoutes, { prefix: "/webhooks" }),
    fastify.register(saleorRestRoutes),
  ]);
};
