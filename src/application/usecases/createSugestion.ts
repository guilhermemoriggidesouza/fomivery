import Product from "~/domain/product";
import ProductRepository from "../repositories/product";
import Menu from "~/domain/menu";

export type inputDTO = {
  sugestionValue: number;
  sectionId: number;
  orgId: number;
};

export default class CreatSugestionUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: inputDTO): Promise<{
    products: Product[];
    totalSugested: number;
  }> {
    const products = await this.productRepository.findBySectionAndOrg(
      input.sectionId,
      input.orgId,
    );
    const menu = new Menu(products, input.sugestionValue);
    const productsSugested = menu.getSugestion();
    return { products: productsSugested, totalSugested: menu.totalSugested };
  }
}
