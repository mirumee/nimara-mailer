import type { MarkOptional } from "ts-essentials";

import type { Manifest, PermissionEnum } from "@/graphql/schema";

export type SaleorAppManifest = MarkOptional<
  Omit<Manifest, "permissions">,
  | "audience"
  | "author"
  | "brand"
  | "requiredSaleorVersion"
  | "extensions"
  | "configurationUrl"
  | "dataPrivacy"
  | "dataPrivacyUrl"
  | "identifier" // Not yet implemented?
> & {
  id: string;
  permissions: PermissionEnum[];
};
