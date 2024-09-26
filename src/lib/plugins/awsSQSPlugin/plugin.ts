import "./config";

import type { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { sqsClient } from "./client";

const index: FastifyPluginCallback = (fastify, {}, next) => {
  fastify.decorate("sqs", sqsClient);

  next();
};

export default fastifyPlugin(index, { name: "awsSQSPlugin" });
