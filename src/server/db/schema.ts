import { sql } from "drizzle-orm";
import { text, sqliteTable, real, integer } from "drizzle-orm/sqlite-core";

export const orgTable = sqliteTable("org", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  tenant: text("tenant").notNull(),
  telephone: text("telephone").notNull(),
  email: text("email").notNull(),
  bg_color: text("bg_color").notNull().default("#FFF"),
  font_color: text("font_color").notNull().default("#000"),
  bg_image: text("bg_image").notNull(),
  salesman: text("salesman").notNull(),
  pay_day: integer({ mode: 'timestamp' }).notNull(),
  delivery: integer({ mode: 'boolean' }).notNull(),
  delivery_tax: real("delivery_tax")
})

export const orderTable = sqliteTable("order", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  hash: text("hash").notNull(),
  total: real("total").notNull(),
  telephone: text("telephone"),
  email: text("email"),
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
  image: text("image").notNull(),
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