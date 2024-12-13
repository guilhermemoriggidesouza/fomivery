import { eq } from "drizzle-orm";
import orderRepository from "~/application/repositories/order";
import Order from "~/domain/order";
import Product from "~/domain/product";
import { db } from "~/server/db";
import { orderProdTable, orderTable, productTable } from "~/server/db/schema";

export default class OrderRepositoryImp implements orderRepository {
    async update(order: Order) {
        await db.update(orderTable)
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
                tax: order.tax
            })
            .where(eq(orderTable.id, order.id!))
    };

    insertProducts(products: Product[], orderId: number, orgId: number): { product_id: number, order_id: number, org_id: number, qtd_product: number }[] {
        return products.map(p => ({ product_id: p.id, order_id: orderId, org_id: orgId, qtd_product: p.quantity! }))
    }

    async findByHash(orderHash: string): Promise<Order | null> {
        const orderRecovery = await db.select().from(orderTable)
            .leftJoin(orderProdTable, eq(orderProdTable.order_id, orderTable.id))
            .leftJoin(productTable, eq(productTable.id, orderProdTable.product_id))
            .where(eq(orderTable.hash, orderHash))
            .all()
        const [order] = [...orderRecovery]
        if (!order) {
            return null
        }
        const orderDomain = Order.toDomain(order.order)
        orderDomain.products = orderRecovery.map(op =>
            new Product(
                op.product!.id,
                op.product!.description,
                op.product!.title,
                op.product!.value,
                op.product!.section_id,
                op.product!.org_id,
                op.product!.image,
                op.order_product!.qtd_product
            )
        )
        return orderDomain
    }

    async create(order: Order): Promise<Order | null> {
        const [orderCreated] = await db.insert(orderTable).values({
            name: order.name,
            hash: order.hash,
            address: order.address,
            total: order.total,
            telephone: order.telephone,
            email: order.email,
            created_at: order.createdAt,
            obs: order.obs,
            org_id: order.orgId,
        }).returning()
        if (!orderCreated) {
            return null
        }
        const orderDomainCreated = Order.toDomain(orderCreated)
        const orderProd = this.insertProducts(order.products, orderDomainCreated.id!, orderDomainCreated.orgId)
        const [orderProductsCreated] = await db.insert(orderProdTable).values(orderProd).returning()
        if (orderProductsCreated) {
            orderDomainCreated.products = order.products
        }
        return orderDomainCreated
    }
}