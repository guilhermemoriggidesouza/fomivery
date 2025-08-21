import Product from "~/domain/product";
import ProductRepository from "../repositories/product";

export default class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(productId: number): Promise<void> {
        await this.productRepository.delete(productId)
    }
}
