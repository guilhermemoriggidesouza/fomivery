import Order from "~/domain/order";

export default interface OrderRepository {
  create: (order: Order) => Promise<Order | null>;
  findByHash: (orderHash: string) => Promise<Order | null>;
  update: (order: Order) => Promise<void>;
}
