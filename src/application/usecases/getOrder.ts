import Order from "~/domain/order"
import OrderRepository from "../repositories/order"

export type inputDTO = {
    orderId: number
}

export default class GetOrder {
    constructor(private readonly orderRepository: OrderRepository) { }

    async execute(input: inputDTO): Promise<Order> {
        const order = await this.orderRepository.findById(input.orderId)
        if (!order) {
            throw new Error("Order error")
        }
        return order
    }
}