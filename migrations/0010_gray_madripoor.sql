ALTER TABLE `order` ADD `change_payment` real;--> statement-breakpoint
ALTER TABLE `order` ADD `payment_type` text;--> statement-breakpoint
ALTER TABLE `order` ADD `delivery` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `org` DROP COLUMN `delivery`;