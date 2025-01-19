import OrderRepository from "../repositories/order";
import Order from "~/domain/order";
import AdditionalRepository from "../repositories/additional";
import { BoughtProduct } from "~/domain/product";
import { Additional } from "~/domain/additional";

export type inputDTO = {
  products: {
    id: number;
    hash: string;
    title: string;
    value?: number;
    orgId: number;
    obrigatoryAdditional: boolean;
    quantity: number;
    price?: number;
    additionals?: { id: number; ownerId: number; hash: string }[];
  }[];
  orgId: number;
  name?: string;
  telephone?: string;
  email?: string;
};

export default class CreatOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly additionalRepository: AdditionalRepository,
  ) {}

  async execute(input: inputDTO): Promise<Order> {
    const products = await Promise.all(
      input.products.map(async (product) => {
        let additional: Additional[] = [];
        if (product.additionals) {
          additional = await this.additionalRepository.findAdditionalsById(
            product.additionals,
          );
        }
        const boughtProduct = new BoughtProduct({ ...product, additional });
        boughtProduct.hash = product.hash;
        boughtProduct.price = product.price;
        boughtProduct.quantity = product.quantity;
        boughtProduct.additional = additional;
        return boughtProduct;
      }),
    );
    const orderToCreate = Order.createDomain(
      products,
      input.orgId,
      input.telephone,
      input.email,
      input.name,
    );
    const order = await this.orderRepository.create(orderToCreate);
    if (!order) {
      throw new Error("Cannot create order");
    }
    return order;
  }
}
