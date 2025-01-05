CREATE TABLE `product_additional` (
	`id` integer PRIMARY KEY NOT NULL,
	`id_product_owner` integer,
	`id_product_additional` integer,
	FOREIGN KEY (`id_product_owner`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_product_additional`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `order_product` ADD `product_id_owner` integer REFERENCES product(id);--> statement-breakpoint
ALTER TABLE `product` ADD `additional_product` integer DEFAULT false;