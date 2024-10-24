import { z } from "zod";

/**
 * Zod coerce bool does not work as expected:
 * const schema = z.coerce.boolean();
 * schema.parse("true"); // => true
 * schema.parse("false"); // => true
 * https://github.com/colinhacks/zod/issues/1630
 */
export const envBool = z
  .enum(["true", "false", ""])
  .transform((value) => value === "true")
  .pipe(z.boolean());

export const envToStrList = (
  env: string | undefined,
  defaultValue: any = undefined
): string[] | undefined => {
  if (env) {
    const parsed = env?.split(",").filter(Boolean);

    return parsed;
  }

  return defaultValue;
};
