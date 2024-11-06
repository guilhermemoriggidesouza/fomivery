export default class Product {
    constructor(
        public readonly id: number,
        public readonly description: string,
        public readonly title: string,
        public readonly value: number,
        public readonly sectionId: number,
        public readonly orgId: number,
        public readonly image?: string | null,
        public quantity: number = 0,
    ) {

    }
}