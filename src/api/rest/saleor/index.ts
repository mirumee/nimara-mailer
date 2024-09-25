import { type FastifyRequest } from "fastify";
import type { FastifyPluginAsync } from "fastify/types/plugin";

import { CONFIG } from "@/config";
import { type AppManifestWebhook } from "@/graphql/schema";
import { saleorAppRouter } from "@/lib/saleor/apps/router";
import { getConfigProvider } from "@/providers/config";
import { getJWKSProvider } from "@/providers/jwks";
import { getSaleorClient } from "@/providers/saleorClient";

import { saleor } from "./saleor";
import { EVENT_HANDLERS, webhooks } from "./webhooks";

const getManifestWebhooks = (request: FastifyRequest): AppManifestWebhook[] =>
  EVENT_HANDLERS.map(({ event, name, query }) => ({
    asyncEvents: [event],
    name,
    query,
    syncEvents: [],
    targetUrl: request.urlFor(`saleor:webhooks:email:${name}`),
  }));

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
        permissions: ["MANAGE_PRODUCTS", "MANAGE_ORDERS"],
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
