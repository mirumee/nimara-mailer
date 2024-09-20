import type { FastifyPluginCallback } from "fastify";
import { type onRequestHookHandler } from "fastify/types/hooks";
import fastifyPlugin from "fastify-plugin";

export const hook: onRequestHookHandler = (request, _, done) => {
  const protocol = request.headers["x-forwarded-proto"] || request.protocol;
  const appUrl = `${protocol}://${request.hostname}`;
  const urlFull = `${appUrl}${request.url}`;

  request.appUrl = appUrl;
  request.urlFull = urlFull;

  done();
};

const urlPlugin: FastifyPluginCallback = (fastify, _, next) => {
  fastify.decorateRequest("appUrl", "");
  fastify.decorateRequest("urlFull", "");

  fastify.addHook("onRequest", hook);
  fastify.addHook("onResponse", hook);

  next();
};

export default fastifyPlugin(urlPlugin, { name: "urlPlugin" });
