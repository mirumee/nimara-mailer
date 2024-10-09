import { z } from "zod";

import { saleorAppConfigSchema } from "@/lib/saleor/apps/config/schema";
import { prepareConfig } from "@/lib/zod/util";

import packageJson from "../package.json";
import { appConfigSchema, commonConfigSchema } from "./lib/config/schema";

export const configSchema = z
  .object({
    SQS_QUEUE_URL: z.string().url(),
    FETCH_TIMEOUT: z
      .number()
      .default(10000)
      .describe("Fetch timeout in milliseconds."),
    SERVER_PORT: z.number().default(3000),
    PROXY_PORT: z.number().default(3001),
    STATIC_URL: z.string().url(),
    STOREFRONT_URL: z.string().url(),
    FROM_EMAIL: z.string().email().default("hello@mirumee.com"),
    FROM_NAME: z.string().default("Mirumee"),
    DEFAULT_REGION: z.string().default("GB"),
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
