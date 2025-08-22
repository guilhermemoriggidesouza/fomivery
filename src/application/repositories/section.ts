import Section from "~/domain/section";

export default interface SectionRepository {
  findByOrgId: (orgId: number, isAditional?: boolean) => Promise<Section[]>;
  delete: (sectionId: number) => Promise<void>;
  create: (product: Section) => Promise<Section>
  edit: (product: Section) => Promise<Section>
  findByIds: (sectionIds: number[]) => Promise<Section[]>
}
