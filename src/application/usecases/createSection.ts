import Section from "~/domain/section";
import SectionRepository from "../repositories/section";

export type inputDTO = {
    title: string,
    orgId: number,
};

export default class CreatSectionUseCase {
    constructor(private readonly sectionRepository: SectionRepository) { }

    async execute(input: inputDTO): Promise<Section> {
        const section = new Section(
            0,
            input.title,
            input.orgId,
        );
        await this.sectionRepository.create(section)
        return section;
    }
}
