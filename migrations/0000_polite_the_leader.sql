CREATE TABLE `product` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`value` numeric NOT NULL,
	`image` text NOT NULL,
	`section_id` integer NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `section` (
	`id` numeric PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
