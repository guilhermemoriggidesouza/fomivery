import Product from "~/domain/product"
import OrderRepository from "../repositories/order"
import Order from "~/domain/order"
import ProductRepository from "../repositories/product"

export type inputDTO = {
    products: number[],
    name: string,
    orgId: number,
    telephone?: string,
    email?: string
}

export default class CreatOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) { }

    async execute(input: inputDTO): Promise<Order> {
        const products = await this.productRepository.findByIds(input.products);
        const orderToCreate = Order.createDomain(products, input.name, input.orgId, input.telephone, input.email)
        const order = await this.orderRepository.create(orderToCreate)
        if (!order) {
            throw new Error("Cannot create order")
        }
        return order
    }
}