ALTER TABLE `org` ALTER COLUMN "delivery_tax" TO "delivery_tax" real DEFAULT 2;--> statement-breakpoint
ALTER TABLE `org` ADD `tax_per_km` real DEFAULT 2;