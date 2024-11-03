export default class Org {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly tenant: string,
        public readonly telephone: string,
        public readonly bgColor: string,
        public readonly fontColor: string,
        public readonly bgImage: string,
        public readonly salesman: string,
        public readonly payDay: Date,
        public readonly icon?: string | null,
        public readonly address?: string | null,
        public readonly deliveryTax?: number | null,
    ) {

    }
}