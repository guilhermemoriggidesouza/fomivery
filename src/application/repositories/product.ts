import Product from "~/domain/product"

export default interface ProductRepository {
    findBySection: (sectionId: number) => Promise<Product[]>
}