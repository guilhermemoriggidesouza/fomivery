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
  pay_day: integer({ mode: 'timestamp' }).notNull(),
  delivery_tax: real("delivery_tax").default(2),
  tax_per_km: real("tax_per_km").default(2)
})

export const orderTable = sqliteTable("order", {
  id: integer("id").primaryKey(),
  hash: text("hash").notNull(),
  total: real("total").notNull(),
  address: text("address"),
  change_payment: real("change_payment"),
  payment_type: text("payment_type"),
  delivery: integer({ mode: 'boolean' }).notNull().default(true),
  telephone: text("telephone"),
  email: text("email"),
  name: text("name"),
  tax: real("tax"),
  obs: text("obs"),
  created_at: integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  finish_at: integer({ mode: 'timestamp' }),
  org_id: integer("org_id").notNull().references(() => orgTable.id)
})

export const sectionTable = sqliteTable("section", {
  id: integer('id').primaryKey(),
  title: text("title").notNull(),
  org_id: integer("org_id").notNull().references(() => orgTable.id)
})

export const productTable = sqliteTable("product", {
  id: integer('id').primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  value: real("value").notNull(),
  image: text("image"),
  section_id: integer("section_id").notNull().references(() => sectionTable.id),
  org_id: integer("org_id").notNull().references(() => orgTable.id)
});

export const orderProdTable = sqliteTable("order_product", {
  id: integer("id").primaryKey(),
  org_id: integer("org_id").notNull().references(() => orgTable.id),
  product_id: integer("product_id").notNull().references(() => productTable.id),
  qtd_product: integer("qtd_product").notNull(),
  order_id: integer("order_id").notNull().references(() => orderTable.id),
})