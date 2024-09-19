import { z } from "zod";

import { prepareConfig } from "@/lib/zod/util";

export const configSchema = z.object({
  DATABASE_URL: z.string(),
});

export const PLUGIN_CONFIG = prepareConfig({
  schema: configSchema,
  name: "drizzlePlugin",
});
