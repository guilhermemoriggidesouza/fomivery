import { Additional } from "~/domain/additional";

export default interface AdditionalRepository {
  findAdditionalByProductById: (productId: number) => Promise<Additional[]>;
  findAdditionalsById: (
    additionals: {
      id: number;
      ownerId: number;
      hash: string;
    }[],
  ) => Promise<Additional[]>;
}
