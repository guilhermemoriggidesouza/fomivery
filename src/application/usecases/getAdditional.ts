import AdditionalRepository from "../repositories/additional";
import { AdditionalSection } from "~/domain/additionalSection";

export type inputDTO = {
  productId: number;
};

export default class GetAdditional {
  constructor(private readonly additionalRepository: AdditionalRepository) {}

  async execute(input: inputDTO): Promise<AdditionalSection[]> {
    const additional =
      await this.additionalRepository.findAdditionalByProductById(
        input.productId,
      );
    return additional;
  }
}
