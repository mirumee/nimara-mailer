import { fileURLToPath } from "node:url";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { graphqlRoutes } from "@/api/graphql/routes";
import { restRoutes } from "@/api/rest/routes";
import { CONFIG } from "@/config";
import { errorHandler } from "@/lib/api/errorHandler";
import AWSSecretManagerPlugin from "@/lib/plugins/awsSecretManagerPlugin";
import { type FastifyPlugin } from "@/lib/plugins/types";
import UrlForPlugin from "@/lib/plugins/urlForPlugin";
import UrlPlugin from "@/lib/plugins/urlPlugin";

import { logger } from "./lib/logger";

export async function createServer() {
  const registrations = [];

  const server = Fastify({
    disableRequestLogging: true,
    logger: CONFIG.LOG_LEVEL ? logger : false,
  });

  server.addHook("onRequest", (req, reply, done) => {
    req.log.info({
      body: req.body,
      method: req.method,
      query: req.query,
      statusCode: reply.raw.statusCode,
      type: "request",
      url: req.raw.url,
    });

    done();
  });
  server.addHook("onResponse", (req, reply, done) => {
    req.log.info({
      elapsedTime: reply.elapsedTime,
      method: req.method,
      statusCode: reply.raw.statusCode,
      type: "response",
      url: req.raw.url,
    });

    done();
  });

  server.addHook("onRegister", (instance) => {
    /**
     * This won't apply to plugins wrapped with `fastifyPlugin`.
     */
    registrations.push(instance.pluginName);
  });

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  /**
   * Plugins registration
   */
  for (const [plugin, opts] of [
    [UrlPlugin, {}],
    [UrlForPlugin, {}],
    [AWSSecretManagerPlugin, {}],
  ]) {
    // @ts-ignore
    const pluginName = plugin?.[Symbol.for("plugin-meta")]?.name ?? plugin.name;
    registrations.push(pluginName);

    await server.register(plugin as FastifyPlugin, opts);
  }

  server.setErrorHandler(errorHandler);

  /**
   * Apis registration
   */
  await server.register(restRoutes, {
    prefix: "/api",
  });
  await server.register(graphqlRoutes, {
    prefix: "/graphql",
  });

  server.log.info(`Registrations: ${registrations.join(", ")}.`);

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const app = await createServer();

  app.ready((err) => {
    if (err) {
      app.log.fatal(err);
      process.exit(1);
    }
  });

  app.listen({ host: "0.0.0.0", port: CONFIG.SERVER_PORT }, (err) => {
    if (err) {
      app.log.fatal(err);
      process.exit(1);
    }
  });
}