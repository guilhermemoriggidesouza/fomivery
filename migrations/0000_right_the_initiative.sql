CREATE TABLE `order_product` (
	`id` integer PRIMARY KEY NOT NULL,
	`hash_id` text,
	`org_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`product_id_owner` integer,
	`qtd_product` integer NOT NULL,
	`price` real,
	`order_id` integer NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id_owner`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` integer PRIMARY KEY NOT NULL,
	`hash` text NOT NULL,
	`total` real NOT NULL,
	`address` text,
	`change_payment` real,
	`payment_type` text,
	`delivery` integer DEFAULT true NOT NULL,
	`telephone` text,
	`email` text,
	`name` text,
	`tax` real,
	`obs` text,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`finish_at` integer,
	`org_id` integer NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `org` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tenant` text NOT NULL,
	`address` text,
	`icon` text,
	`telephone` text NOT NULL,
	`email` text NOT NULL,
	`bg_color` text DEFAULT '#FFF' NOT NULL,
	`font_color` text DEFAULT '#000' NOT NULL,
	`bg_image` text,
	`bg_color_screen` text,
	`salesman` text NOT NULL,
	`pay_day` integer NOT NULL,
	`delivery_tax` real DEFAULT 2,
	`tax_per_km` real DEFAULT 2
);
--> statement-breakpoint
CREATE TABLE `product_additional` (
	`id` integer PRIMARY KEY NOT NULL,
	`id_product_owner` integer,
	`id_product_additional` integer,
	FOREIGN KEY (`id_product_owner`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_product_additional`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_section` (
	`id` integer PRIMARY KEY NOT NULL,
	`id_product` integer,
	`id_section` integer,
	FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_section`) REFERENCES `section`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`value` real,
	`image` text,
	`org_id` integer NOT NULL,
	`obrigatory_additional` integer DEFAULT false,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `section` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`org_id` integer NOT NULL,
	`max_per_additional` integer,
	`min_per_additional` integer,
	`isAdditional` integer DEFAULT false,
	FOREIGN KEY (`org_id`) REFERENCES `org`(`id`) ON UPDATE no action ON DELETE no action
);
