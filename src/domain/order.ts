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
    changePayment?: number | null | undefined,
    products: Product[],
    email?: string | null,
    obs?: string,
    telephone?: string | null,
    finishAt?: Date | null,
    id?: number | null,
    address?: string | null,
    tax?: number | null,
}

export default class Order {
    constructor(
        public total: number,
        public readonly hash: string,
        public readonly orgId: number,
        public products: Product[],
        public delivery: boolean = true,
        public name?: string | null,
        public email?: string | null,
        public telephone?: string | null,
        public readonly createdAt?: Date,
        public finishAt?: Date | null,
        public obs?: string | null,
        public paymentType?: string | null,
        public changePayment?: number | null,
        public readonly id?: number | null,
        public address?: string | null,
        public tax?: number | null,
    ) {
    }

    finish(name: string,
        paymentType: string,
        telephone: string,
        total: number,
        email?: string,
        obs?: string,
        changePayment?: number,
        delivery?: boolean,
        address?: string,
        tax?: number
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
        this.address = address
        this.tax = tax
    }

    static createDomain(products: Product[], orgId: number, telephone?: string, email?: string, name?: string,) {
        const total = products.map(p => p.value * p.quantity).reduce((previous, current) => {
            return previous + current
        })
        const todayDate = new Date()
        const hash = v4()
        return new Order(total, hash, orgId, products, true, name, email, telephone, todayDate)
    }
    static fromTypeToDomain(orderType: OrderType) {
        return new Order(
            orderType.total,
            orderType.hash,
            orderType.orgId,
            orderType.products,
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
            orderType.tax
        )
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
        change_payment?: number | null,
        address?: string | null,
        tax?: number | null
    }) {
        const products: Product[] = []
        return new Order(
            orderDb.total,
            orderDb.hash,
            orderDb.org_id,
            products,
            orderDb.delivery,
            orderDb.name,
            orderDb.email,
            orderDb.telephone,
            orderDb.created_at,
            orderDb.finish_at,
            orderDb.obs,
            orderDb.payment_type,
            orderDb.change_payment,
            orderDb.id,
            orderDb.address,
            orderDb.tax
        )
    }

}