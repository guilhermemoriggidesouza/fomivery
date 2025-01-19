import { eq } from "drizzle-orm";
import orderRepository from "~/application/repositories/order";
import { Additional } from "~/domain/additional";
import Order from "~/domain/order";
import Product, { BoughtProduct } from "~/domain/product";
import { db } from "~/infra/db";
import { orderProdTable, orderTable, productTable } from "~/server/db/schema";

export default class OrderRepositoryImp implements orderRepository {
  async update(order: Order) {
    await db
      .update(orderTable)
      .set({
        name: order.name,
        email: order.email,
        telephone: order.telephone,
        finish_at: order.finishAt,
        obs: order.obs,
        change_payment: order.changePayment,
        payment_type: order.paymentType,
        delivery: order.delivery,
        total: order.total,
        address: order.address,
        tax: order.tax,
      })
      .where(eq(orderTable.id, order.id!));
  }

  createProductsValues(
    products: BoughtProduct[],
    orderId: number,
    orgId: number,
  ): {
    product_id: number;
    order_id: number;
    org_id: number;
    price?: number;
    qtd_product: number;
    hash_id?: string;
    product_id_owner?: number;
  }[] {
    const productsMapper = products.map((p) => ({
      product_id: p.id,
      order_id: orderId,
      hash_id: p.hash!,
      org_id: orgId,
      price: p.price,
      qtd_product: p.quantity!,
    }));

    const additionalMapper = Array.from(
      products.flatMap((p) => p.additional!),
    ).map((additional: Additional) => ({
      product_id: additional.product.id,
      order_id: orderId,
      org_id: orgId,
      hash_id: additional.productOwner.hash!,
      price: additional.product.value,
      product_id_owner: additional.productOwner.id,
      qtd_product: 1,
    }));
    return productsMapper.concat(additionalMapper);
  }

  async findByHash(orderHash: string): Promise<Order | undefined> {
    const orderRecovery = await db
      .select()
      .from(orderTable)
      .leftJoin(orderProdTable, eq(orderProdTable.order_id, orderTable.id))
      .leftJoin(productTable, eq(productTable.id, orderProdTable.product_id))
      .where(eq(orderTable.hash, orderHash))
      .all();
    const [order] = [...orderRecovery];
    if (!order) {
      return;
    }
    const products: BoughtProduct[] = [];
    const orderDomain = new Order(
      order.order.total,
      order.order.hash,
      order.order.org_id,
      products,
      order.order.delivery,
      order.order.name ?? undefined,
      order.order.email ?? undefined,
      order.order.telephone ?? undefined,
      order.order.created_at ?? undefined,
      order.order.finish_at ?? undefined,
      order.order.obs ?? undefined,
      order.order.payment_type ?? undefined,
      order.order.change_payment ?? undefined,
      order.order.id ?? undefined,
      order.order.address ?? undefined,
      order.order.tax ?? undefined,
    );
    orderDomain.products = orderRecovery
      .map((op) => {
        if (!op.order_product!.product_id_owner) {
          const boughtProduct = BoughtProduct.create(op.product!);
          boughtProduct.price = op.order_product!.price ?? undefined;
          boughtProduct.hash = op.order_product!.hash_id!;
          boughtProduct.quantity = op.order_product!.qtd_product;
          return boughtProduct;
        }
      })
      .filter((e) => e != undefined);
    const additionals = orderRecovery
      .filter((op) => op.order_product!.product_id_owner)
      .map((additional) => {
        const productOwner = orderDomain.products.find(
          (prod) => prod.id == additional.order_product?.product_id_owner,
        );
        const productAdditional = new Product(
          additional.product!.id,
          additional.product!.title,
          additional.product!.org_id,
          additional.product!.obrigatory_additional ?? false,
          additional.product!.value ?? undefined,
          additional.product!.section_id ?? undefined,
          additional.product!.additional_section_id ?? undefined,
          additional.product!.description ?? undefined,
          additional.product!.image ?? undefined,
        );
        return new Additional(
          { id: productOwner!.id, hash: productOwner!.hash },
          productAdditional,
        );
      });
    orderDomain.setAdditionalsToProduct(additionals);
    return orderDomain;
  }

  async create(order: Order): Promise<Order | undefined> {
    const [orderCreated] = await db
      .insert(orderTable)
      .values({
        name: order.name,
        hash: order.hash,
        address: order.address,
        total: order.total,
        telephone: order.telephone,
        email: order.email,
        created_at: order.createdAt,
        obs: order.obs,
        org_id: order.orgId,
      })
      .returning();
    if (!orderCreated) {
      return;
    }

    const products: BoughtProduct[] = [];
    const orderDomainCreated = new Order(
      orderCreated.total,
      orderCreated.hash,
      orderCreated.org_id,
      products,
      orderCreated.delivery,
      orderCreated.name ?? undefined,
      orderCreated.email ?? undefined,
      orderCreated.telephone ?? undefined,
      orderCreated.created_at ?? undefined,
      orderCreated.finish_at ?? undefined,
      orderCreated.obs ?? undefined,
      orderCreated.payment_type ?? undefined,
      orderCreated.change_payment ?? undefined,
      orderCreated.id ?? undefined,
      orderCreated.address ?? undefined,
      orderCreated.tax ?? undefined,
    );
    const orderProd = this.createProductsValues(
      order.products as BoughtProduct[],
      orderDomainCreated.id!,
      orderDomainCreated.orgId,
    );
    const [orderProductsCreated] = await db
      .insert(orderProdTable)
      .values(orderProd)
      .returning();
    if (orderProductsCreated) {
      orderDomainCreated.products = order.products;
    }
    return orderDomainCreated;
  }
}
