ALTER TABLE `order` RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE `order` RENAME COLUMN "finishAt" TO "finish_at";--> statement-breakpoint
ALTER TABLE `org` RENAME COLUMN "telefone" TO "telephone";--> statement-breakpoint
ALTER TABLE `order` ALTER COLUMN "total" TO "total" real NOT NULL;--> statement-breakpoint
ALTER TABLE `order` ADD `email` text;--> statement-breakpoint
ALTER TABLE `org` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `org` ADD `delivery_tax` real;--> statement-breakpoint
ALTER TABLE `product` ALTER COLUMN "value" TO "value" real NOT NULL;