import Section from "~/domain/section";
import SectionRepository from "../repositories/section";

export type inputDTO = {
  orgId: number;
};

export default class GetSection {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async execute(input: inputDTO): Promise<Section[]> {
    const sections = await this.sectionRepository.findByOrgId(input.orgId);
    return sections;
  }
}
