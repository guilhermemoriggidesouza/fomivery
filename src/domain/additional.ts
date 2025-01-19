import { AdditionalSection, AdditionalSectionType } from "./additionalSection";
import Product, { ProductType } from "./product";

export type ProductOwnerAddition = {
  hash?: string;
  id: number;
};

export class Additional {
  constructor(
    public readonly productOwner: ProductOwnerAddition,
    public readonly product: Product,
    public readonly section?: AdditionalSection,
  ) {}
}

export type AdditionalType = {
  productOwner: ProductOwnerAddition;
  product: ProductType;
  section?: AdditionalSectionType;
};
