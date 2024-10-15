import { z } from "zod";

export const commonConfigSchema = z.object({
  ENVIRONMENT: z
    .enum(["development", "local", "test", "production"])
    .default("local"),
  IS_BROWSER: z.boolean().default(typeof window !== "undefined"),
  IS_DEVELOPMENT: z.boolean().default(process.env.NODE_ENV === "development"),
  IS_TEST: z.boolean().default(process.env.NODE_ENV === "test"),
  IS_SSR: z.boolean().default(typeof window === "undefined"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
});

export const appConfigSchema = (
  z.object({
    IS_DEVELOPMENT: z.boolean().default(process.env.NODE_ENV === "development"),
    NAME: z.string(),
    RELEASE: z.string().optional(),
    VERSION: z.string(),
  }) as any as z.ZodObject<{
    NAME: z.ZodString;
    RELEASE: z.ZodString;
    VERSION: z.ZodString;
  }>
).refine((data) => {
  if (data.VERSION && data.NAME) {
    data.RELEASE = `${data.NAME}@${data.VERSION}`;
  }
  return data;
});