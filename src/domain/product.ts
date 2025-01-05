export default class Product {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly value: number,
        public readonly orgId: number,
        public readonly sectionId?: number | null,
        public readonly description?: string | null,
        public readonly image?: string | null,
        public quantity: number = 0,
    ) {

    }
}