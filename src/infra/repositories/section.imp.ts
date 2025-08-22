import { and, eq, inArray } from "drizzle-orm";
import SectionRepository from "~/application/repositories/section";
import Product from "~/domain/product";
import Section from "~/domain/section";
import { db } from "~/infra/db";
import { productSectionTable, productTable, sectionTable } from "~/server/db/schema";

export default class SectionRepositoryImp implements SectionRepository {
  async findByOrgId(orgId: number, isAdditional?: boolean): Promise<Section[]> {
    const sections = await db
      .select()
      .from(sectionTable)
      .where(
        isAdditional ? and(
          eq(sectionTable.org_id, orgId),
          eq(sectionTable.isAdditional, isAdditional),
        ) : eq(sectionTable.org_id, orgId),
      )

    return await Promise.all(sections.map(
      async (section) => {
        const productsDB = await db.select().from(productSectionTable)
          .leftJoin(
            productTable,
            eq(productTable.id, productSectionTable.id_product)
          ).where(eq(productSectionTable.id_section, section.id))

        const products = productsDB.map(({ product }) => {
          return new Product(
            product!.id,
            product!.title,
            product!.org_id,
            product!.obrigatory_additional ?? false,
            product!.value ?? undefined,
            undefined,
            product!.description ?? undefined,
            product!.image ?? undefined,
          )
        })
        return new Section(
          section.id,
          section.title,
          section.org_id,
          section.max_per_additional ?? undefined,
          section.min_per_additional ?? undefined,
          undefined,
          section.isAdditional ?? undefined,
          products
        )
      }
    ));
  }

  async findByIds(sectionIds: number[]) {
    const sections = await db
      .select()
      .from(sectionTable)
      .where(
        inArray(sectionTable.id, sectionIds)
      )
    return sections.map(section => new Section(
      section.id,
      section.title,
      section.org_id,
      section.max_per_additional ?? undefined,
      section.min_per_additional ?? undefined,
      undefined,
      section.isAdditional ?? undefined,
      undefined
    ))
  }

  async create(section: Section) {
    await db.insert(sectionTable).values({
      title: section.title,
      org_id: section.orgId,
      isAdditional: section.isAditional,
      max_per_additional: section.maxPerAddition,
      min_per_additional: section.minPerAddition
    })

    return section
  }

  async edit(section: Section) {
    await db.update(sectionTable).set({
      title: section.title,
      org_id: section.orgId,
      isAdditional: section.isAditional,
      max_per_additional: section.maxPerAddition,
      min_per_additional: section.minPerAddition
    }).where(eq(sectionTable.id, section.id))

    return section
  }

  async delete(sectionId: number) {
    await db.delete(productSectionTable).where(eq(sectionTable.id, sectionId))
    await db.delete(sectionTable).where(eq(sectionTable.id, sectionId))
  }
}
