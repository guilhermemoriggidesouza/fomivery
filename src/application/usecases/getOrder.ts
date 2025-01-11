import Order from "~/domain/order";
import OrderRepository from "../repositories/order";

export type inputDTO = {
  hash: string;
};

export default class GetOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: inputDTO): Promise<Order> {
    const order = await this.orderRepository.findByHash(input.hash);
    if (!order) {
      throw new Error("Order error");
    }
    return order;
  }
}
