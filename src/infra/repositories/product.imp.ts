import { and, count, eq, inArray } from "drizzle-orm";
import ProductRepository from "~/application/repositories/product";
import Product from "~/domain/product";
import { db } from "~/infra/db";
import {
  productAdditionalTable,
  productTable,
} from "~/server/db/schema";

export default class ProductRepositoryImp implements ProductRepository {
  async findByIds(products: number[]): Promise<Product[]> {
    const productsDb = await db
      .select()
      .from(productTable)
      .where(inArray(productTable.id, products));

    return productsDb.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          product.org_id,
          product.obrigatory_additional ?? false,
          product.value ?? undefined,
          product.section_id ?? undefined,
          product.additional_section_id ?? undefined,
          product.description ?? undefined,
          product.image ?? undefined,
        ),
    );
  }

  async findByOrgId(orgId: number): Promise<Product[]> {
    const productsDb = await db
      .select()
      .from(productTable)
      .where(eq(productTable.org_id, orgId));

    return productsDb.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          product.org_id,
          product.obrigatory_additional ?? false,
          product.value ?? undefined,
          product.section_id ?? undefined,
          product.additional_section_id ?? undefined,
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
        section_id: productTable.section_id,
        description: productTable.description,
        image: productTable.image,
        additional_section_id: productTable.additional_section_id,
        count_additionals: count(productAdditionalTable.id),
      })
      .from(productTable)
      .leftJoin(
        productAdditionalTable,
        eq(productAdditionalTable.id_product_owner, productTable.id),
      )
      .where(
        and(
          eq(productTable.section_id, sectionId),
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
        product.additional_section_id ?? undefined,
        product.description ?? undefined,
        product.image ?? undefined,
        product.count_additionals > 0,
      );
    });
  }

  async create(product: Product) {
    await db.insert(productTable).values({
      title: product.title,
      description: product.description,
      value: product.value,
      org_id: product.orgId,
      obrigatory_additional: product.obrigatoryAdditional,
      section_id: null
    })
    return product
  }

}
