import type { FastifyPluginAsync } from "fastify/types/plugin";

import { CONFIG } from "@/config";

export const saleorRestRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/app", { name: "saleor:app" }, async (request, reply) =>
    reply.send(CONFIG.RELEASE)
  );
};
