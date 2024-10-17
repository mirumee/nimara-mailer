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
    SERVER_PORT: z.number().default(3000),
    // Queue where Saleor events are pushed by events-receiver, and pulled by emails-sender.
    SQS_QUEUE_URL: z.string().url(),
    // Paths & assets population.
    STATIC_URL: z.string().url(),
    STOREFRONT_URL: z.string().url(),
    // Used for generating paths, selecting localized formatters.
    DEFAULT_REGION: z.string().default("GB"),
    // Email sender info.
    FROM_EMAIL: z.string().email().default("hello@mirumee.com"),
    FROM_NAME: z.string().default("Mirumee"),
    // Sentry.
    SENTRY_DEBUG: z.boolean().default(false),
    SENTRY_DSN: z.string().url().optional(),

    EMAIL_PROVIDER: z.enum(["NODE_MAILER", "AWS_SES"]).default("AWS_SES"),
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
