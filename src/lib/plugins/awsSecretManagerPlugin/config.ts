import { z } from "zod";

import { prepareConfig } from "@/lib/zod/util";

export const configSchema = z.object({
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  SECRET_MANAGER_APP_CONFIG_PATH: z.string(),
});

export const PLUGIN_CONFIG = prepareConfig({
  schema: configSchema,
  name: "awsSecretManagerPlugin",
});
