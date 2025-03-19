import { and, count, eq, inArray } from "drizzle-orm";
import ProductRepository from "~/application/repositories/product";
import Product from "~/domain/product";
import { db } from "~/infra/db";
import {
  productAdditionalTable,
  productSectionTable,
  productTable,
  sectionTable,
} from "~/server/db/schema";

export default class ProductRepositoryImp implements ProductRepository {
  async findByIds(products: number[]): Promise<Product[]> {
    const productsDb = await db
      .select()
      .from(productTable)
      .leftJoin(
        productSectionTable,
        eq(productSectionTable.id_product, productTable.id),
      )
      .where(inArray(productTable.id, products));

    return productsDb.map(
      ({ product, product_section }) =>
        new Product(
          product.id,
          product.title,
          product.org_id,
          product.obrigatory_additional ?? false,
          product.value ?? undefined,
          product_section!.id ?? undefined,
          product.description ?? undefined,
          product.image ?? undefined,
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
        org_id: productTable.org_id,
        obrigatory_additional: productTable.obrigatory_additional,
        section_id: productSectionTable.id_section,
        description: productTable.description,
        image: productTable.image,
        count_additionals: count(productAdditionalTable.id),
      })
      .from(productTable)
      .leftJoin(
        productSectionTable,
        eq(productSectionTable.id_product, productTable.id),
      )
      .leftJoin(
        productAdditionalTable,
        eq(productAdditionalTable.id_product_owner, productTable.id),
      )
      .where(
        and(
          eq(productSectionTable.id_section, sectionId),
          eq(productTable.org_id, orgId),
        ),
      )
      .groupBy(productTable.id);
    return products.map((product) => {
      return new Product(
        product.id,
        product.title,
        product.org_id,
        product.obrigatory_additional ?? false,
        product.value ?? undefined,
        product.section_id ?? undefined,
        product.description ?? undefined,
        product.image ?? undefined,
        product.count_additionals > 0,
      );
    });
  }
}
