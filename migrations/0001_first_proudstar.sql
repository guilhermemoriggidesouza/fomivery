CREATE TABLE `org` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tenant` text NOT NULL,
	`telefone` text NOT NULL,
	`bg_color` text DEFAULT '#FFF' NOT NULL,
	`font_color` text NOT NULL,
	`salesman` text NOT NULL,
	`pay_day` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `product` ADD `org_id` integer NOT NULL REFERENCES org(id);--> statement-breakpoint
ALTER TABLE `section` ADD `org_id` integer NOT NULL REFERENCES org(id);