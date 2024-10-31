import Product from "./product";
import { v4 } from "uuid";
export type OrderType = {
    total: number,
    createdAt: Date,
    name: string,
    hash: string,
    orgId: number,
    products: Product[],
    email?: string | null,
    telephone?: string | null,
    finishAt?: Date | null,
    id?: number | null,
}
export default class Order {
    private constructor(
        public readonly total: number,
        public readonly createdAt: Date,
        public readonly hash: string,
        public readonly orgId: number,
        public products: Product[],
        public name?: string | null,
        public email?: string | null,
        public telephone?: string | null,
        public finishAt?: Date | null,
        public readonly id?: number | null,
    ) {
    }

    finish(name: string, telephone: string, email?: string) {
        this.name = name
        this.telephone = telephone
        this.email = email
        this.finishAt = new Date()
    }
    static createDomain(products: Product[], orgId: number, telephone?: string, email?: string, name?: string,) {
        const total = products.map(p => p.value * p.quantity).reduce((previous, current) => {
            return previous + current
        })
        const todayDate = new Date()
        const hash = v4()
        return new Order(total, todayDate, hash, orgId, products, name, telephone, email)
    }

    static toDomain(orderDb: {
        id: number,
        total: number,
        created_at: Date,
        hash: string,
        org_id: number,
        name?: string | null,
        email?: string | null,
        telephone?: string | null,
        finish_at?: Date | null,
    }) {
        const products: Product[] = []
        return new Order(orderDb.total, orderDb.created_at, orderDb.hash, orderDb.org_id, products, orderDb.name, orderDb.email, orderDb.telephone, orderDb.finish_at, orderDb.id)
    }

}