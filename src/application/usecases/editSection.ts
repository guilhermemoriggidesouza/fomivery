import Section from "~/domain/section";
import SectionRepository from "../repositories/section";

export type inputDTO = {
    title: string,
    orgId: number,
    id: number,
    isAditional: boolean
    min?: number,
    max?: number,
};

export default class EditSectionUseCase {
    constructor(private readonly sectionRepository: SectionRepository) { }

    async execute(input: inputDTO): Promise<Section> {
        const section = new Section(
            0,
            input.title,
            input.orgId,
            input.max,
            input.min,
            undefined,
            input.isAditional,
            undefined
        );
        await this.sectionRepository.edit(section)
        return section;
    }
}
