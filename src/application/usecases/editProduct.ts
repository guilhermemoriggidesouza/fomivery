import Product from "~/domain/product";
import ProductRepository from "../repositories/product";
import SectionRepository from "../repositories/section";
import CategoryRepository from "../repositories/category";

export type inputDTO = {
    id: number,
    title: string,
    orgId: number,
    obrigatoryAdditional: boolean,
    value: number,
    description: string,
    sections: number[],
    categories: number[],
};

export default class EditProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly sectionRepository: SectionRepository,
        private readonly categoryRepository: CategoryRepository
    ) { }

    async execute(input: inputDTO): Promise<Product> {

        const sections = await this.sectionRepository.findByIds(input.sections)
        const categories = await this.categoryRepository.findByIds(input.categories)

        const product = new Product(
            input.id,
            input.title,
            input.orgId,
            input.obrigatoryAdditional,
            input.value,
            undefined,
            input.description,
            undefined,
            undefined,
            undefined,
            sections,
            categories
        );
        await this.productRepository.edit(product)
        return product;
    }
}
