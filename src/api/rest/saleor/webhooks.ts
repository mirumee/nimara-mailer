import type { FastifyPluginAsync } from "fastify/types/plugin";
import rawBody from "fastify-raw-body";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { verifyWebhookSignature } from "@/lib/saleor/auth";
import { saleorWebhookHeaders } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

export const webhooks: FastifyPluginAsync = async (fastify) => {
  await fastify.register(rawBody);

  /**
   * Better to validate webhooks signature in one place.
   * TODO: Create one common schema/type for responses
   */
  fastify.addHook("preHandler", async (request) => {
    const parsedHeaders = saleorWebhookHeaders.parse(request.headers);

    await verifyWebhookSignature({
      forceRefresh: true,
      issuer: parsedHeaders["saleor-api-url"],
      jwksProvider: getJWKSProvider(),
      jws: parsedHeaders["saleor-signature"],
      payload: request.rawBody,
    });
  });

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/shipping-methods-for-checkout",
    {
      name: "saleor:webhooks:shipping-methods-for-checkout",
    },
    async (request, reply) => [
      {
        amount: 5,
        currency: "USD",
        id: "my-id",
        name: "Pete's method",
      },
    ]
  );
};
