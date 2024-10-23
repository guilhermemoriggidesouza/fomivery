import { text, sqliteTable, numeric, integer } from "drizzle-orm/sqlite-core";

export const orgTable = sqliteTable("org", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  tenant: text("tenant").notNull(),
  telephone: text("telefone").notNull(),
  bg_color: text("bg_color").notNull().default("#FFF"),
  font_color: text("font_color").notNull().default("#000"),
  bg_image: text("bg_image").notNull(),
  salesman: text("salesman").notNull(),
  pay_day: integer({ mode: 'timestamp' }).notNull() // Date
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
  value: numeric("value").notNull(),
  image: text("image").notNull(),
  section_id: integer("section_id").notNull().references(() => sectionTable.id),
  org_id: integer("org_id").notNull().references(() => orgTable.id)
});