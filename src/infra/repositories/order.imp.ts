import { eq } from "drizzle-orm";
import orderRepository from "~/application/repositories/order";
import Order from "~/domain/order";
import Product from "~/domain/product";
import { db } from "~/server/db";
import { orderProdTable, orderTable } from "~/server/db/schema";

export default class OrderRepositoryImp implements orderRepository {
    insertProducts(products: Product[], orderId: number, orgId: number): { product_id: number, order_id: number, org_id: number }[] {
        return products.map(p => ({ product_id: p.id, order_id: orderId, org_id: orgId }))
    }
    
    async create(order: Order): Promise<Order | null> {
        const [orderCreated] = await db.insert(orderTable).values({
            name: order.name,
            total: order.total,
            telephone: order.telephone,
            email: order.email,
            created_at: order.createdAt,
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