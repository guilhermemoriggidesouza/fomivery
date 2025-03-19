import AdditionalRepository from "../repositories/additional";
import Section from "~/domain/section";

export type inputDTO = {
  productId: number;
};

export default class GetAdditional {
  constructor(private readonly additionalRepository: AdditionalRepository) {}

  async execute(input: inputDTO): Promise<Section[]> {
    const additional =
      await this.additionalRepository.findAdditionalByProductById(
        input.productId,
      );
    const additionalSections = Section.transformAdditional(additional);
    return additionalSections;
  }
}
