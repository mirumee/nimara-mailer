import type { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, {}, next) => {
  fastify.addHook("onRequest", (req, reply, done) => {
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

  fastify.addHook("onResponse", (req, reply, done) => {
    req.log.info({
      elapsedTime: reply.elapsedTime,
      method: req.method,
      statusCode: reply.raw.statusCode,
      type: "response",
      url: req.raw.url,
    });

    done();
  });

  next();
};

export default fastifyPlugin(plugin, { name: "winstonLoggingPlugin" });
