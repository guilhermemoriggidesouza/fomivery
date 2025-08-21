import Product from "~/domain/product";
import ProductRepository from "../repositories/product";

export type inputDTO = {
    title: string,
    orgId: number,
    obrigatoryAdditional: boolean,
    value: number,
    description: string,
};

export default class CreatProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(input: inputDTO): Promise<Product> {
        const product = new Product(
            0,
            input.title,
            input.orgId,
            input.obrigatoryAdditional,
            input.value,
            undefined,
            undefined,
            input.description
        );
        this.productRepository.create(product)
        return product;
    }
}
