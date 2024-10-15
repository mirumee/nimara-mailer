import { type PartialBy } from "@/lib/types";

import { type localizedFormatter } from "./utils";

export type LocalizedFormatter = ReturnType<typeof localizedFormatter>;

export type OptsWithoutLocale<T extends (...args: any[]) => any> = PartialBy<
  Parameters<T>[0],
  "locale"
>;
