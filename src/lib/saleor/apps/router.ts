import { type FastifyRequest } from "fastify";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { installApp } from "@/lib/saleor/apps/install";
import { saleorHeaders } from "@/lib/saleor/schema";
import type { SaleorAppManifest } from "@/lib/saleor/types";

import { type SaleorClient } from "../client/types";
import { type SaleorConfigProvider } from "../config/types";
import { type JWSProvider } from "../jwks/types";

type BaseOpts = {
  request: FastifyRequest;
};

/**
 * Utility router for Saleor apps which handles serving app manifest and app registration.
 */
export const saleorAppRouter: FastifyPluginAsync<{
  getManifest: (opts: BaseOpts) => Promise<SaleorAppManifest>;
  getRegisterProviders: (opts: BaseOpts & { authToken: string }) => Promise<{
    configProvider: SaleorConfigProvider;
    jwksProvider: JWSProvider;
    saleorClient: SaleorClient;
  }>;
  saleorUrl: string;
}> = async (fastify, { getManifest, getRegisterProviders, saleorUrl }) => {
  fastify.get(
    "/manifest",
    {
      name: "saleor:manifest",
    },
    async (request) => getManifest({ request })
  );

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

      const { configProvider, jwksProvider, saleorClient } =
        await getRegisterProviders({
          authToken: saleorAuthToken,
          request,
        });

      await installApp({
        configProvider,
        jwksProvider,
        saleorAuthToken,
        saleorClient,
        saleorDomain,
        saleorUrl,
      });

      return { status: "ok" };
    }
  );
};
