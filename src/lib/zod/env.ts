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
  defaultEmpty = false
): string[] | undefined => {
  const parsed = env?.split(",").filter(Boolean);

  if (!parsed && !defaultEmpty) {
    return [];
  }

  return parsed;
};
