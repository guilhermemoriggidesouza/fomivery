import Product from "~/domain/product"
import OrderRepository from "../repositories/order"
import Order from "~/domain/order"
import ProductRepository from "../repositories/product"

export type inputDTO = {
    products: { id: number, qtd: number }[],
    orgId: number,
    name?: string,
    telephone?: string,
    email?: string
}

export default class CreatOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) { }

    async execute(input: inputDTO): Promise<Order> {
        const products = await this.productRepository.findByIds(input.products.map(p => p.id));
        const flatIdsQtd = input.products.reduce((previous: any, current: any) => {
            previous[current.id] = current.qtd
            return previous
        }, {})
        products.map(p => {
            p.quantity = flatIdsQtd[p.id]
        })
        const orderToCreate = Order.createDomain(products, input.orgId, input.telephone, input.email, input.name)
        const order = await this.orderRepository.create(orderToCreate)
        if (!order) {
            throw new Error("Cannot create order")
        }
        return order
    }
}