import OrderRepository from "../repositories/order"
import Order from "~/domain/order"

export type inputDTO = {
    name: string,
    telephone: string,
    paymentType: string,
    changePayment?: number,
    total: number,
    email?: string,
    delivery?: boolean,
    obs?: string,
    hash: string
}

export default class FinishOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async execute(input: inputDTO): Promise<Order> {
        const order = await this.orderRepository.findByHash(input.hash)
        if (!order) {
            throw new Error("Error on get order to update")
        }
        order.finish(input.name, input.paymentType, input.telephone, input.total, input.email, input.obs, input.changePayment, input.delivery)
        let newOrder = await this.orderRepository.update(order)
        if (!order) {
            throw new Error("Error on request order")
        }
        return order
    }
}