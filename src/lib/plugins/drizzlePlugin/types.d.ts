import { type FastifyInstance } from "fastify";

import { type DBClient } from "./client.ts";

declare module "fastify" {
  interface FastifyInstance {
    db: ReturnType<typeof DBClient>;
  }
}
