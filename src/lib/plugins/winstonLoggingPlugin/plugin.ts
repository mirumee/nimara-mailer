import type { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, {}, next) => {
  fastify.addHook("onRequest", (req, reply, done) => {
    req.log.info("Incoming request", {
      body: req.body,
      method: req.method,
      query: req.query,
      url: req.raw.url,
      statusCode: reply.raw.statusCode,
      type: "REQUEST",
    });

    done();
  });

  fastify.addHook("onResponse", (req, reply, done) => {
    req.log.info("Outgoing response", {
      method: req.method,
      url: req.raw.url,
      statusCode: reply.raw.statusCode,
      elapsedTime: reply.elapsedTime,
      type: "RESPONSE",
    });

    done();
  });

  next();
};

export default fastifyPlugin(plugin, { name: "winstonLoggingPlugin" });
