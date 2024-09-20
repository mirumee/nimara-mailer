import { z } from "zod";

import { saleorAppConfigSchema } from "@/lib/saleor/apps/config/schema";
import { prepareConfig } from "@/lib/zod/util";

import packageJson from "../package.json";
import { appConfigSchema, commonConfigSchema } from "./lib/config/schema";

export const configSchema = z
  .object({
    FETCH_TIMEOUT: z
      .number()
      .default(10000)
      .describe("Fetch timeout in milliseconds."),

    SALEOR_URL: z.string(),
    SERVER_PORT: z.number().default(3000),
  })
  .and(commonConfigSchema)
  .and(appConfigSchema)
  .and(saleorAppConfigSchema);

export type ConfigSchema = z.infer<typeof configSchema>;

export const CONFIG = prepareConfig({
  input: {
    NAME: packageJson.name,
    VERSION: packageJson.version,
  },
  schema: configSchema,
});
