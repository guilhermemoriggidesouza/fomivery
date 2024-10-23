PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_section` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`org_id` integer NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_section`("id", "title", "org_id") SELECT "id", "title", "org_id" FROM `section`;--> statement-breakpoint
DROP TABLE `section`;--> statement-breakpoint
ALTER TABLE `__new_section` RENAME TO `section`;--> statement-breakpoint
PRAGMA foreign_keys=ON;