import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { PLUGIN_CONFIG } from "./config";
import * as schema from "./schema";

export const dbClient = drizzle(
  new pg.Pool({
    connectionString: PLUGIN_CONFIG.DATABASE_URL,
  }),
  { schema }
);

export type DBClient = typeof dbClient;
