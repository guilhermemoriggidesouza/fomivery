import { AdditionalSection } from "./additionalSection";
import Product from "./product";

export class Additional {
  constructor(
    public readonly productOwnerId: string,
    public readonly section: AdditionalSection,
    public readonly product: Product,
  ) {}
}
