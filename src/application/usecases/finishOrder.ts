import OrderRepository from "../repositories/order"
import Order from "~/domain/order"

export type inputDTO = {
    name: string,
    telephone: string,
    email?: string,
    obs?: string,
    hash: string
}

export default class FinishOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async execute(input: inputDTO): Promise<Order> {
        const order = await this.orderRepository.findByHash(input.hash)
        if(!order){
            throw new Error("Error on get order to update")
        }
        order.finish(input.name, input.telephone, input.email, input.obs)
        let newOrder = await this.orderRepository.update(order)
        if (!order) {
            throw new Error("Error on request order")
        }
        return order
    }
}