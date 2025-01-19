import { sql } from "drizzle-orm";
import { text, sqliteTable, real, integer } from "drizzle-orm/sqlite-core";

export const orgTable = sqliteTable("org", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  tenant: text("tenant").notNull(),
  address: text("address"),
  icon: text("icon"),
  telephone: text("telephone").notNull(),
  email: text("email").notNull(),
  bg_color: text("bg_color").notNull().default("#FFF"),
  font_color: text("font_color").notNull().default("#000"),
  bg_image: text("bg_image"),
  bg_color_screen: text("bg_color_screen"),
  salesman: text("salesman").notNull(),
  pay_day: integer({ mode: "timestamp" }).notNull(),
  delivery_tax: real("delivery_tax").default(2),
  tax_per_km: real("tax_per_km").default(2),
});

export const orderTable = sqliteTable("order", {
  id: integer("id").primaryKey(),
  hash: text("hash").notNull(),
  total: real("total").notNull(),
  address: text("address"),
  change_payment: real("change_payment"),
  payment_type: text("payment_type"),
  delivery: integer({ mode: "boolean" }).notNull().default(true),
  telephone: text("telephone"),
  email: text("email"),
  name: text("name"),
  tax: real("tax"),
  obs: text("obs"),
  created_at: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
  finish_at: integer({ mode: "timestamp" }),
  org_id: integer("org_id")
    .notNull()
    .references(() => orgTable.id),
});

export const sectionTable = sqliteTable("section", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  org_id: integer("org_id")
    .notNull()
    .references(() => orgTable.id),
});

export const additionalSectionTable = sqliteTable("additional_section", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  org_id: integer("org_id")
    .notNull()
    .references(() => orgTable.id),
  max_per_additional: integer("max_per_additional"),
  min_per_additional: integer("min_per_additional"),
});

export const productTable = sqliteTable("product", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  value: real("value"),
  image: text("image"),
  section_id: integer("section_id").references(() => sectionTable.id),
  additional_section_id: integer("additional_section_id").references(
    () => additionalSectionTable.id,
  ),
  org_id: integer("org_id")
    .notNull()
    .references(() => orgTable.id),
  obrigatory_additional: integer({ mode: "boolean" }).default(false),
});

export const orderProdTable = sqliteTable("order_product", {
  id: integer("id").primaryKey(),
  hash_id: text("hash_id"),
  org_id: integer("org_id")
    .notNull()
    .references(() => orgTable.id),
  product_id: integer("product_id")
    .notNull()
    .references(() => productTable.id),
  product_id_owner: integer("product_id_owner").references(
    () => productTable.id,
  ),
  qtd_product: integer("qtd_product").notNull(),
  price: real("price"),
  order_id: integer("order_id")
    .notNull()
    .references(() => orderTable.id),
});

export const productAdditionalTable = sqliteTable("product_additional", {
  id: integer("id").primaryKey(),
  id_product_owner: integer("id_product_owner").references(
    () => productTable.id,
  ),
  id_product_additional: integer("id_product_additional").references(
    () => productTable.id,
  ),
});
