CREATE TABLE IF NOT EXISTS "saleor_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_token" text,
	"saleor_app_id" text,
	"saleor_domain" text,
	CONSTRAINT "saleor_config_saleor_app_id_unique" UNIQUE("saleor_app_id"),
	CONSTRAINT "saleor_config_saleor_domain_unique" UNIQUE("saleor_domain")
);
