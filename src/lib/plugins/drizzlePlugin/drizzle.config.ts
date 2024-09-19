import { defineConfig } from "drizzle-kit";

import { PLUGIN_CONFIG } from "./config";

export default defineConfig({
  schema: "./src/lib/plugins/drizzlePlugin/schema.ts",
  out: "./src/lib/plugins/drizzlePlugin/migrations",
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    url: PLUGIN_CONFIG.DATABASE_URL,
  },
});
