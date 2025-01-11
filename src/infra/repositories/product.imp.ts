import { and, eq, inArray } from "drizzle-orm";
import ProductRepository from "~/application/repositories/product";
import Product from "~/domain/product";
import { db } from "~/server/db";
import { productTable } from "~/server/db/schema";

export default class ProductRepositoryImp implements ProductRepository {
  async findByIds(ids: number[]): Promise<Product[]> {
    const products = await db
      .select()
      .from(productTable)
      .where(inArray(productTable.id, ids));

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          Number(product.value),
          product.org_id,
          product.obrigatory_additional ?? false,
          product.section_id,
          product.description,
          product.image,
        ),
    );
  }
  async findBySectionAndOrg(
    sectionId: number,
    orgId: number,
  ): Promise<Product[]> {
    const products = await db
      .select({
        id: productTable.id,
        title: productTable.title,
        value: productTable.value,
        orgId: productTable.org_id,
        obrigatory_additional: productTable.obrigatory_additional,
      })
      .from(productTable)
      .where(
        and(
          eq(productTable.section_id, sectionId),
          eq(productTable.org_id, orgId),
        ),
      );
    return products.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          Number(product.value),
          product.org_id,
          product.obrigatory_additional ?? false,
          product.section_id,
          product.description,
          product.image,
        ),
    );
  }
}
