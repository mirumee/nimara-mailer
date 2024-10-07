import type { FastifyPluginAsync } from "fastify/types/plugin";
import { type ZodTypeProvider } from "fastify-type-provider-zod";

import { OrderCreatedSubscriptionDocument } from "@/graphql/operations/subscriptions/generated";
import { validateDocumentAgainstData } from "@/lib/graphql/validate";
import { verifyJWTSignature } from "@/lib/saleor/auth";
import { saleorBearerHeader } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

import { saleorRoutes } from "./saleor";

export const restRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(saleorRoutes, { prefix: "/saleor" });

  fastify.get("/healthcheck", () => "ok");

  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/protected-route",
    {
      schema: { headers: saleorBearerHeader },
    },
    async (request) => {
      await verifyJWTSignature({
        jwksProvider: getJWKSProvider(),
        jwt: request.headers.authorization,
      });
      return { status: "ok" };
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/test",

    async (request, response) => {
      const { isValid, error } = validateDocumentAgainstData({
        data: request.body,
        document: OrderCreatedSubscriptionDocument,
      });

      return response.status(isValid ? 200 : 400).send({ isValid, error });
    }
  );
};
