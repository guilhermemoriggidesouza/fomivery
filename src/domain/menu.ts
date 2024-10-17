import { FuckingHashTreeSearchable } from "./fuckingHashTree";
import Product from "./product";

export default class Menu {
    totalSugested: number = 0
    productsSugested: Product[]
    constructor(public products: Product[], public sugestedValue?: number, public sugestedAmmount?: number) {
        this.productsSugested = [...products]
    }

    getSugestion() {
        const fuckingTree = new FuckingHashTreeSearchable([...this.products])
        console.log(fuckingTree)
        return this.products
    }
}