export default class Product {
    constructor(
        public readonly id: number,
        public readonly description: string,
        public readonly title: string,
        public readonly value: number,
        public readonly image: string,
        public readonly sectionId: number,
    ) {

    }
}