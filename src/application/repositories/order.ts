import Order from "~/domain/order"

export default interface OrderRepository {
    create: (order: Order) => Promise<Order | null>
    findById: (orderId: number) => Promise<Order | null>
}