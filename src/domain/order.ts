import Product from "./product";

export default class Order {

    private constructor(
        public readonly total: number,
        public readonly createdAt: Date,
        public readonly name: string,
        public readonly orgId: number,
        public products: Product[],
        public readonly email?: string | null,
        public readonly telephone?: string | null,
        public readonly finishAt?: Date | null,
        public readonly id?: number | null,
    ) {
    }

    static createDomain(products: Product[], name: string, orgId: number, telephone?: string, email?: string) {
        const total = products.map(p => p.value).reduce((previous, current) => {
            return previous + current
        })
        const todayDate = new Date()
        return new Order(total, todayDate, name, orgId, products, telephone, email)
    }

    static toDomain(orderDb: {
        id: number,
        total: number,
        created_at: Date,
        name: string,
        org_id: number,
        email?: string | null,
        telephone?: string | null,
        finish_at?: Date | null,
    }) {
        const products: Product[] = []
        return new Order(orderDb.total, orderDb.created_at, orderDb.name, orderDb.org_id, products, orderDb.email, orderDb.telephone, orderDb.finish_at, orderDb.id)
    }

}