import { AdditionalSection } from "~/domain/additionalSection";

export default interface AdditionalRepository {
  findAdditionalByProductById: (
    productId: number,
  ) => Promise<AdditionalSection[]>;
}
