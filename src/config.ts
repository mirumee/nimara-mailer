import { z } from "zod";

import { envBool } from "@/lib/zod/env";
import { prepareConfig } from "@/lib/zod/util";

import packageJson from "../package.json";

export const configSchema = z.object({
  // Saleor manifest mainly.
  VERSION: z.string().default(packageJson.version), // npm_package_* Does not work on AWS lambda.
  NAME: z.string().default(packageJson.name),
  ABOUT: z.string().default("TS Boilerplate Saleor app"),
  SALEOR_URL: z.string(),
  SALEOR_DOMAIN: z.string(),
  SALEOR_GRAPHQL_URL: z.string(),
  ENVIRONMENT: z
    .enum(["local", "development", "stagging", "production"])
    .default("production"),
  SERVER_PORT: z.number().default(3000),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", ""])
    .optional()
    .default("error"),
  // Used to override `appUrl` helper mainly for local & docker development (ngrok).
  APP_URL: z.string().url().optional(),
  FETCH_TIMEOUT: z
    .number()
    .default(10000)
    .describe("Fetch timeout in milliseconds."),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  GRAPHIQL_ENABLED: envBool.default("true"),
  REMIX_BUILD_DIR: z.string().default("build/client"),
});

export type ConfigSchema = z.infer<typeof configSchema>;

const config = prepareConfig({
  input: {
    SALEOR_GRAPHQL_URL: `${process.env.SALEOR_URL}/graphql/`,
    SALEOR_DOMAIN: new URL(process.env.SALEOR_URL ?? "").hostname,
  },
  schema: configSchema,
});

export const CONFIG = {
  ...config,
  IS_DEVELOPMENT: config.NODE_ENV === "development",
};
