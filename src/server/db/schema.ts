import { text, sqliteTable, numeric, integer } from "drizzle-orm/sqlite-core";

export const sectionTable = sqliteTable("section", {
  id: numeric('id').primaryKey(),
  title: text("title").notNull(),
})

export const productTable = sqliteTable("product", {
  id: integer('id').primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  value: numeric("value").notNull(),
  image: text("image").notNull(),
  section_id: integer("section_id").notNull().references(() => sectionTable.id)
});