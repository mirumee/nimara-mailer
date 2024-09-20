import { z } from "zod";

import { prepareConfig } from "@/lib/zod/util";

import { LOG_LEVELS } from "./const";

export const configSchema = z.object({
  LOG_LEVEL: z
    .enum(["", ...LOG_LEVELS])
    .optional()
    .default("error"),
  NODE_ENV: z.string(),
  IS_DEVELOPMENT: z.boolean(),
});

export const PLUGIN_CONFIG = prepareConfig({
  name: "awsSecretManagerPlugin",
  schema: configSchema,
  input: {
    IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  },
});
