import { eq } from "drizzle-orm";
import SectionRepository from "~/application/repositories/section";
import Section from "~/domain/section";
import { db } from "~/server/db";
import { sectionTable } from "~/server/db/schema";

export default class SectionRepositoryImp implements SectionRepository {
  async findByOrgId(orgId: number): Promise<Section[]> {
    const sections = await db
      .select()
      .from(sectionTable)
      .where(eq(sectionTable.org_id, orgId));
    return sections.map(
      (section) => new Section(section.id, section.title, section.org_id),
    );
  }
}
