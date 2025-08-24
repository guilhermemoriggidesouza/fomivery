import { and, count, eq, inArray } from "drizzle-orm";
import CategoryRepository from "~/application/repositories/category";
import Category from "~/domain/category";
import { db } from "~/infra/db";
import {
  categoryTable,
} from "~/server/db/schema";

export default class CategoryRepositoryImp implements CategoryRepository {

  async findByOrgId(orgId: number): Promise<Category[]> {
    const categoriesDb = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.org_id, orgId));

    return categoriesDb.map(
      (category) =>
        new Category(
          category.id,
          category.title,
          category.color,
          category.org_id,
        ),
    );
  }


  async findByIds(categoryIds: number[]) {
    const categories = await db
      .select()
      .from(categoryTable)
      .where(
        inArray(categoryTable.id, categoryIds)
      )
    return categories.map(category => new Category(
      category.id,
      category.title,
      category.color,
      category.org_id,
    ))
  }

  async create(category: Category) {
    await db.insert(categoryTable).values({
      title: category.title,
      color: category.color,
      org_id: category.orgId,
    })

    return category
  }


  async delete(categoryId: number) {
    await db.delete(categoryTable).where(eq(categoryTable.id, categoryId))
  }
}
