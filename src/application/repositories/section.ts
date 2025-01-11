import Section from "~/domain/section";

export default interface SectionRepository {
  findByOrgId: (orgId: number) => Promise<Section[]>;
}
