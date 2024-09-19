import type { FastifyPluginAsync } from "fastify/types/plugin";

import { routes } from "./routes";
import { webhooks } from "./webhooks";

export const saleorRoutes: FastifyPluginAsync = async (
  fastify
): Promise<void> => {
  await Promise.all([
    fastify.register(routes),
    fastify.register(webhooks, { prefix: "/webhooks" }),
  ]);
};
