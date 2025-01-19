import { Additional } from "./additional";
import { BoughtProduct, BoughtProductType } from "./product";
import { v4 } from "uuid";

export type OrderType = {
  total: number;
  createdAt: Date;
  name: string;
  hash: string;
  orgId: number;
  paymentType: string;
  delivery: boolean;
  changePayment?: number | undefined;
  products: BoughtProductType[];
  email?: string;
  obs?: string;
  telephone?: string;
  finishAt?: Date;
  id?: number;
  address?: string;
  tax?: number;
};

export default class Order {
  constructor(
    public total: number,
    public readonly hash: string,
    public readonly orgId: number,
    public products: BoughtProduct[],
    public delivery: boolean = true,
    public name?: string,
    public email?: string,
    public telephone?: string,
    public readonly createdAt?: Date,
    public finishAt?: Date,
    public obs?: string,
    public paymentType?: string,
    public changePayment?: number,
    public readonly id?: number,
    public address?: string,
    public tax?: number,
  ) {}

  finish(
    name: string,
    paymentType: string,
    telephone: string,
    total: number,
    email?: string,
    obs?: string,
    changePayment?: number,
    delivery?: boolean,
    address?: string,
    tax?: number,
  ) {
    this.name = name;
    this.telephone = telephone;
    this.email = email;
    this.finishAt = new Date();
    this.obs = obs;
    this.delivery = delivery || true;
    this.changePayment = changePayment;
    this.paymentType = paymentType;
    this.total = total;
    this.address = address;
    this.tax = tax;
  }

  setAdditionalsToProduct(additionals: Additional[]) {
    this.products = this.products.map((product) => {
      const additionalsOfProduct = additionals.filter(
        (additional) => additional.productOwner.hash == product.hash,
      );
      product.additional = additionalsOfProduct;
      return product;
    });
  }

  static createDomain(
    products: BoughtProduct[],
    orgId: number,
    telephone?: string,
    email?: string,
    name?: string,
  ) {
    const total = products
      .map((p) => (p.price ?? 0) * p.quantity)
      .reduce((previous, current) => {
        return previous + current;
      });
    const todayDate = new Date();
    const hash = v4();
    return new Order(
      total,
      hash,
      orgId,
      products,
      true,
      name,
      email,
      telephone,
      todayDate,
    );
  }

  static fromTypeToDomain(orderType: OrderType) {
    return new Order(
      orderType.total,
      orderType.hash,
      orderType.orgId,
      orderType.products as BoughtProduct[],
      orderType.delivery,
      orderType.name,
      orderType.email,
      orderType.telephone,
      orderType.createdAt,
      orderType.finishAt,
      orderType.obs,
      orderType.paymentType,
      orderType.changePayment,
      orderType.id,
      orderType.address,
      orderType.tax,
    );
  }
}
