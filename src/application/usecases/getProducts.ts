import Product from "~/domain/product"
import ProductRepository from "../repositories/product"
import Menu from "~/domain/menu"

export type inputDTO = {
    sectionId: number
}

export default class GetProducts {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(input: inputDTO): Promise<{
        products: Product[]
    }> {
        const products = await this.productRepository.findBySection(input.sectionId)
        const menu = new Menu(products)
        return { products: menu.products, }
    }
}