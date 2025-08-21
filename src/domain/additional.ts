import Product, { ProductType } from "./product";
import Section from "./section";

export type ProductOwnerAddition = {
  hash?: string;
  id: number;
};

export class Additional {
  constructor(
    public readonly productOwner: ProductOwnerAddition,
    public readonly product: Product,
    public readonly section?: Section,
  ) {}
}

export type AdditionalType = {
  productOwner: ProductOwnerAddition;
  product: ProductType;
  section?: Section;
};
