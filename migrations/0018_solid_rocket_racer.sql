CREATE TABLE `additional_section` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`org_id` integer NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`value` real NOT NULL,
	`image` text,
	`section_id` integer,
	`additional_section_id` integer,
	`org_id` integer NOT NULL,
	`has_additional` integer DEFAULT false,
	FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`additional_section_id`) REFERENCES `additional_section`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_product`("id", "title", "description", "value", "image", "section_id", "additional_section_id", "org_id", "has_additional") SELECT "id", "title", "description", "value", "image", "section_id", "additional_section_id", "org_id", "has_additional" FROM `product`;--> statement-breakpoint
DROP TABLE `product`;--> statement-breakpoint
ALTER TABLE `__new_product` RENAME TO `product`;--> statement-breakpoint
PRAGMA foreign_keys=ON;