CREATE TABLE `order_product` (
	`id` integer PRIMARY KEY NOT NULL,
	`org_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`order_id` integer NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`total` numeric NOT NULL,
	`telephone` text,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`finishAt` integer,
	`org_id` integer NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `org` ADD `delivery` integer NOT NULL;