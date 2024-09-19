import path from "node:path";
import { fileURLToPath } from "node:url";

import DataLoader from "dataloader";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { FastifyPluginAsync } from "fastify/types/plugin";
import fs from "fs";
import { createYoga } from "graphql-yoga";
import { createSchema } from "graphql-yoga";

import { CONFIG } from "@/config";

import { loaders, resolvers } from "./resolvers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const schema = createSchema<null>({
  resolvers,
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
});

const yoga = createYoga<{
  reply: FastifyReply;
  req: FastifyRequest;
}>({
  context: async ({ req }: FastifyRequest, reply: FastifyReply) => ({
    loaders: {
      getUserByIds: new DataLoader(loaders.getUserByIdsLoader),
    },
    user: null,
  }),
  graphiql: CONFIG.GRAPHIQL_ENABLED
    ? {
        shouldPersistHeaders: true,
        title: `${CONFIG.NAME} GraphiQL Playground`,
      }
    : false,
  schema,
});

export const graphqlRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    handler: async (request, reply) => {
      const response = await yoga.handleNodeRequestAndResponse(request, reply, {
        reply,
        req: request,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      reply.send(response.body);

      return reply;
    },
    method: ["GET", "POST", "OPTIONS"],
    url: "/",
  });
};
