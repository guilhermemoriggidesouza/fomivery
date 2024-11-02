import Product from "./product";
import { v4 } from "uuid";

export type OrderType = {
    total: number,
    createdAt: Date,
    name: string,
    hash: string,
    orgId: number,
    paymentType: string,
    delivery: boolean,
    changePayment?: string | null,
    products: Product[],
    email?: string | null,
    obs?: string,
    telephone?: string | null,
    finishAt?: Date | null,
    id?: number | null,
}

export default class Order {
    private constructor(
        public total: number,
        public readonly createdAt: Date,
        public readonly hash: string,
        public readonly orgId: number,
        public products: Product[],
        public delivery: boolean = true,
        public name?: string | null,
        public email?: string | null,
        public telephone?: string | null,
        public finishAt?: Date | null,
        public obs?: string | null,
        public paymentType?: string | null,
        public changePayment?: number | null,
        public readonly id?: number | null,
    ) {
    }

    finish(name: string,
        paymentType: string,
        telephone: string,
        total: number,
        email?: string,
        obs?: string,
        changePayment?: number,
        delivery?: boolean
    ) {
        this.name = name
        this.telephone = telephone
        this.email = email
        this.finishAt = new Date()
        this.obs = obs
        this.delivery = delivery || true
        this.changePayment = changePayment
        this.paymentType = paymentType
        this.total = total
    }

    static createDomain(products: Product[], orgId: number, telephone?: string, email?: string, name?: string,) {
        const total = products.map(p => p.value * p.quantity).reduce((previous, current) => {
            return previous + current
        })
        const todayDate = new Date()
        const hash = v4()
        return new Order(total, todayDate, hash, orgId, products, true, name, telephone, email)
    }

    static toDomain(orderDb: {
        id: number,
        total: number,
        created_at: Date,
        hash: string,
        org_id: number,
        delivery: boolean,
        name?: string | null,
        email?: string | null,
        telephone?: string | null,
        obs?: string | null
        finish_at?: Date | null,
        payment_type?: string | null,
        change_payment?: number | null
    }) {
        const products: Product[] = []
        return new Order(
            orderDb.total,
            orderDb.created_at,
            orderDb.hash,
            orderDb.org_id,
            products,
            orderDb.delivery,
            orderDb.name,
            orderDb.email,
            orderDb.telephone,
            orderDb.finish_at,
            orderDb.obs,
            orderDb.payment_type,
            orderDb.change_payment,
            orderDb.id
        )
    }

}