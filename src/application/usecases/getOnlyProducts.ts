import Product from "~/domain/product";
import ProductRepository from "../repositories/product";
import Menu from "~/domain/menu";

export default class GetOnlyProducts {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute(orgId: number): Promise<Product[]> {
    const products = await this.productRepository.findByOrgId(
      orgId,
    );
    return products;
  }
}
