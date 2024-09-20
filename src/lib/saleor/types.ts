import type { MarkRequired } from "ts-essentials";

import { type Manifest, type PermissionEnum } from "@/graphql/schema";

export type SaleorAppManifest = MarkRequired<
  Partial<Omit<Manifest, "permissions">>,
  "name" | "version" | "tokenTargetUrl" | "webhooks"
> & {
  id: string;
  permissions: PermissionEnum[];
};
