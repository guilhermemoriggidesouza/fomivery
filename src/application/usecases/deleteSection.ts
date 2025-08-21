import Section from "~/domain/section";
import SectionRepository from "../repositories/section";

export default class DeleteSectionUseCase {
    constructor(private readonly sectionRepository: SectionRepository) { }

    async execute(sectionId: number): Promise<void> {
        await this.sectionRepository.delete(sectionId)
    }
}
