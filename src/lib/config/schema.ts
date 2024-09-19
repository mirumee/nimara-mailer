import { z } from "zod";

export const appConfigSchema = (
  z.object({
    NAME: z.string(),
    VERSION: z.string(),
    RELEASE: z.string().optional(),
    ENVIRONMENT: z
      .enum(["development", "local", "test", "production"])
      .default("local"),
    IS_SSR: z.boolean().default(typeof window === "undefined"),
    IS_BROWSER: z.boolean().default(typeof window !== "undefined"),
    IS_DEVELOPMENT: z.boolean().default(process.env.NODE_ENV === "development"),
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
