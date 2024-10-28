import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { CONFIG } from "@/config";
import { validateDocumentAgainstData } from "@/lib/graphql/validate";
import { serializePayload } from "@/lib/payload";
import { verifyJWTSignature } from "@/lib/saleor/auth";
import { saleorBearerHeader } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

import { saleorRoutes } from "./saleor";
import { EVENT_HANDLERS } from "./saleor/webhooks";

export const restRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(saleorRoutes, { prefix: "/saleor" });

  fastify.get("/healthcheck", () => "ok");

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/send-notification",
    {
      name: "send-notification",
      schema: {
        headers: saleorBearerHeader,
        body: z.object({
          data: z.any(),
          event: z.enum(
            EVENT_HANDLERS.map(({ event }) => event.toLowerCase()) as any
          ),
        }),
      },
    },

    async (request, response) => {
      await verifyJWTSignature({
        jwksProvider: getJWKSProvider(),
        jwt: request.headers.authorization,
      });

      const document = EVENT_HANDLERS.find(
        ({ event }) => event.toLowerCase() === request.body.event
      )!.query;

      const { isValid, error } = validateDocumentAgainstData({
        data: request.body.data,
        document,
      });

      if (!isValid) {
        throw new z.ZodError([
          {
            path: ["body > data"],
            message: error ?? "",
            code: "custom",
          },
        ]);
      }

      const payload = serializePayload({
        data: request.body.data,
        event: request.body.event,
      });

      const command = new SendMessageCommand({
        QueueUrl: CONFIG.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(payload),
      });

      await fastify.sqs.send(command);

      return response.send({ status: "ok" });
    }
  );
};
