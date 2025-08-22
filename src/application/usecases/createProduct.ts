import Product from "~/domain/product";
import ProductRepository from "../repositories/product";
import SectionRepository from "../repositories/section";

export type inputDTO = {
    title: string,
    orgId: number,
    obrigatoryAdditional: boolean,
    value: number,
    description: string,
    sections: number[],
};

export default class CreatProductUseCase {
    constructor(private readonly productRepository: ProductRepository, private readonly sectionRepository: SectionRepository) { }

    async execute(input: inputDTO): Promise<Product> {

        const sections = await this.sectionRepository.findByIds(input.sections)

        const product = new Product(
            0,
            input.title,
            input.orgId,
            input.obrigatoryAdditional,
            input.value,
            undefined,
            input.description,
            undefined,
            undefined,
            undefined,
            sections
        );
        await this.productRepository.create(product)
        return product;
    }
}
