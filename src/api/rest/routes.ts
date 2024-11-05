import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { CONFIG } from "@/config";
import {
  CUSTOM_EVENTS_SCHEMA,
  type CustomEventType,
  EMAIL_EVENTS,
} from "@/const";
import { UnauthorizedError } from "@/lib/errors/api";
import { validateDocumentAgainstData } from "@/lib/graphql/validate";
import { serializePayload } from "@/lib/payload";
import { verifyJWTSignature } from "@/lib/saleor/auth";
import { saleorBearerHeader } from "@/lib/saleor/schema";
import { getJWKSProvider } from "@/providers/jwks";

import { saleorRoutes } from "./saleor";
import { SALEOR_EVENTS_MAP } from "./saleor/webhooks";

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
          event: z.enum(EMAIL_EVENTS),
        }),
      },
    },

    async (request, response) => {
      if (CONFIG.AUTHORIZATION_TOKEN) {
        if (CONFIG.AUTHORIZATION_TOKEN !== request.headers.authorization) {
          throw new UnauthorizedError({
            message: "Invalid authorization token.",
          });
        }
      } else {
        await verifyJWTSignature({
          jwksProvider: getJWKSProvider(),
          jwt: request.headers.authorization,
        });
      }

      const saleorEvent = SALEOR_EVENTS_MAP.find(
        ({ event }) => event.toLowerCase() === request.body.event
      );
      let data: any;

      if (saleorEvent) {
        const { isValid, error } = validateDocumentAgainstData({
          data: request.body.data,
          document: saleorEvent.query,
        });
        data = request.body.data;

        if (!isValid) {
          throw new z.ZodError([
            {
              path: ["body > data"],
              message: error ?? "",
              code: "custom",
            },
          ]);
        }
      } else {
        const schema =
          CUSTOM_EVENTS_SCHEMA[request.body.event as CustomEventType];

        data = schema.parse(request.body.data, { path: ["body > data"] });
      }

      const payload = serializePayload({
        data,
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
