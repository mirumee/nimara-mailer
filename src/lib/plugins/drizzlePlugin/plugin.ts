import type { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { dbClient } from "./client";

const index: FastifyPluginCallback = (fastify, {}, next) => {
  fastify.decorate("db", dbClient);

  next();
};

export default fastifyPlugin(index, { name: "drizzlePlugin" });
