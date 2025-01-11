import Product from "~/domain/product";
import ProductRepository from "../repositories/product";
import Menu from "~/domain/menu";

export type inputDTO = {
  sectionId: number;
  orgId: number;
};

export default class GetProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: inputDTO): Promise<Product[]> {
    const products = await this.productRepository.findBySectionAndOrg(
      input.sectionId,
      input.orgId,
    );
    // todo: searchble tree error
    // const menu = new Menu(products)
    return products;
  }
}
