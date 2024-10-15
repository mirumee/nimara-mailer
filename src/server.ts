import { fileURLToPath } from "node:url";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { restRoutes } from "@/api/rest/routes";
import { CONFIG } from "@/config";
import { errorHandler } from "@/lib/api/errorHandler";
import AWSSecretManagerPlugin from "@/lib/plugins/awsSecretManagerPlugin";
import AWSSQSPlugin from "@/lib/plugins/awsSQSPlugin";
import { type FastifyPlugin } from "@/lib/plugins/types";
import UrlForPlugin from "@/lib/plugins/urlForPlugin";
import UrlPlugin from "@/lib/plugins/urlPlugin";
import WinstonLoggingPlugin from "@/lib/plugins/winstonLoggingPlugin";

import { getLogger } from "./providers/logger";

export const logger = getLogger("emails-sender");

export async function createServer() {
  const registrations = [];
  const server = Fastify({
    disableRequestLogging: true,
    logger,
  });

  server.addHook("onRegister", (instance) => {
    registrations.push(instance.pluginName);
  });

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  /**
   * Plugins registration
   */
  for (const [plugin, opts] of [
    [UrlPlugin],
    [UrlForPlugin],
    [WinstonLoggingPlugin],
    [AWSSecretManagerPlugin],
    [AWSSQSPlugin],
  ]) {
    // @ts-ignore
    const pluginName = plugin[Symbol.for("plugin-meta")]?.name ?? plugin.name;
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

  server.log.info("Registering plugins", { registrations });

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
