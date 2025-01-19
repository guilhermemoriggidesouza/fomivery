import Order from "~/domain/order";

export default interface OrderRepository {
  create: (order: Order) => Promise<Order | undefined>;
  findByHash: (orderHash: string) => Promise<Order | undefined>;
  update: (order: Order) => Promise<void>;
}
