import { and, count, eq, inArray } from "drizzle-orm";
import ProductRepository from "~/application/repositories/product";
import Product from "~/domain/product";
import Section from "~/domain/section";
import { db } from "~/infra/db";
import {
  producCategoryTable,
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
          undefined,
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

  async create(product: Product) {
    await db.insert(productTable).values({
      title: product.title,
      description: product.description,
      value: product.value,
      org_id: product.orgId,
      obrigatory_additional: product.obrigatoryAdditional,
    })

    if (product.sections) {
      await Promise.all(product.sections.map(async (section) => {
        await db.insert(productSectionTable).values({
          id_product: product.id,
          id_section: section.id
        })
      }))
    }

    if (product.categories) {
      await Promise.all(product.categories.map(async (category) => {
        await db.insert(producCategoryTable).values({
          id_product: product.id,
          id_category: category.id
        })
      }))
    }

    return product
  }

  hasDiff(newIds: number[], oldIds: number[]) {
    const toRemove = oldIds.filter(oldSec => !newIds.includes(oldSec))
    const toAdd = newIds.filter(sec => !oldIds.includes(sec))

    return { toRemove, toAdd }
  }

  async edit(product: Product) {

    await db.update(productTable).set({
      title: product.title,
      description: product.description,
      value: product.value,
      org_id: product.orgId,
      obrigatory_additional: product.obrigatoryAdditional,
    }).where(eq(productTable.id, product.id))

    if (product.sections) {
      const newSectionsIds = product.sections.map(sec => sec.id)
      const productSections = await db.select({ id_section: productSectionTable.id_section })
        .from(productSectionTable)
        .where(eq(productSectionTable.id_product, product.id))
      const { toAdd, toRemove } = this.hasDiff(newSectionsIds, productSections.map(ps => ps.id_section).filter(id => id !== null))

      const listQuerys = []

      listQuerys.push(
        toAdd.map(async (section) => {
          await db.insert(productSectionTable).values({
            id_product: product.id,
            id_section: section
          })
        })
      )

      listQuerys.push(
        toRemove.map(async (section) => {
          await db.delete(productSectionTable)
            .where(
              and(
                eq(productSectionTable.id_product, product.id),
                eq(productSectionTable.id_section, section)
              )
            )
        })
      )

      await Promise.all(listQuerys)
    }

    if (product.categories) {
      const newCategoryIds = product.categories.map(sec => sec.id)
      const productCategory = await db.select({ id_category: producCategoryTable.id_category })
        .from(producCategoryTable)
        .where(eq(producCategoryTable.id_product, product.id))
      const { toAdd, toRemove } = this.hasDiff(newCategoryIds, productCategory.map(ps => ps.id_category).filter(id => id !== null))

      const listQuerys = []

      listQuerys.push(
        toAdd.map(async (category) => {
          await db.insert(producCategoryTable).values({
            id_product: product.id,
            id_category: category
          })
        })
      )

      listQuerys.push(
        toRemove.map(async (category) => {
          await db.delete(producCategoryTable)
            .where(
              and(
                eq(producCategoryTable.id_product, product.id),
                eq(producCategoryTable.id_category, category)
              )
            )
        })
      )

      await Promise.all(listQuerys)
    }

    return product
  }

  async delete(productId: number) {
    await db.delete(productSectionTable)
      .where(
        and(
          eq(productSectionTable.id_product, productId),
        )
      )
    await db.delete(producCategoryTable)
      .where(
        and(
          eq(productSectionTable.id_product, productId),
        )
      )
    await db.delete(productTable).where(eq(productTable.id, productId))
  }
}
