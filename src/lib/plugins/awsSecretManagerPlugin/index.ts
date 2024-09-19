import type { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { secretsManagerClient } from "./client";
import { PLUGIN_CONFIG } from "./config";

const index: FastifyPluginCallback = (fastify, {}, next) => {
  fastify.decorate("secretsManager", secretsManagerClient);
  fastify.decorate(
    "secretsManagerConfigPath",
    PLUGIN_CONFIG.SECRET_MANAGER_APP_CONFIG_PATH
  );

  next();
};

export default fastifyPlugin(index, { name: "awsSecretManagerPlugin" });
