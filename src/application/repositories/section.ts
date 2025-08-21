import Section from "~/domain/section";

export default interface SectionRepository {
  findByOrgId: (orgId: number) => Promise<Section[]>;
  delete: (sectionId: number) => Promise<void>;
  create: (product: Section) => Promise<Section>

}
