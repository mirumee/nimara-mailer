import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const saleorConfig = pgTable("saleor_config", {
  id: serial("id").primaryKey(),
  authToken: text("auth_token"),
  saleorAppId: text("saleor_app_id").unique(),
  saleorDomain: text("saleor_domain").unique(),
});
