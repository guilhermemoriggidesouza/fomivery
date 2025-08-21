import { and, eq } from "drizzle-orm";
import SectionRepository from "~/application/repositories/section";
import Section from "~/domain/section";
import { db } from "~/infra/db";
import { productSectionTable, sectionTable } from "~/server/db/schema";

export default class SectionRepositoryImp implements SectionRepository {
  async findByOrgId(orgId: number): Promise<Section[]> {
    const sections = await db
      .select()
      .from(sectionTable)
      .where(
        and(
          eq(sectionTable.org_id, orgId),
          eq(sectionTable.isAdditional, false),
        ),
      );
    return sections.map(
      (section) =>
        new Section(
          section.id,
          section.title,
          section.org_id,
          section.max_per_additional ?? undefined,
          section.min_per_additional ?? undefined,
        ),
    );
  }


  async create(product: Section) {
    await db.insert(sectionTable).values({
      title: product.title,
      org_id: product.orgId,
    })

    return product
  }

  async delete(sectionId: number) {
    await db.delete(productSectionTable).where(eq(sectionTable.id, sectionId))
    await db.delete(sectionTable).where(eq(sectionTable.id, sectionId))
  }
}
