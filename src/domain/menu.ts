import { FuckingHashTreeSearchable, Node } from "./fuckingHashTree";
import Product from "./product";

export default class Menu {
    totalSugested: number = 0
    sugestionTree: FuckingHashTreeSearchable
    sugestionCases: Node[] = []
    productsSugestion: Product[] = []
    constructor(public products: Product[], public sugestedValue?: number) {
        this.sugestionTree = new FuckingHashTreeSearchable([...this.products])
    }

    getRangeSugested(): { max: number, min: number } {
        const max = this.sugestedValue! * 1.1
        const min = this.sugestedValue! * 0.9
        return { max, min }
    }

    DFSTreeRange(item: Node) {
        const { max, min } = this.getRangeSugested()
        if (item.total >= min && item.total <= max) {
            this.sugestionCases.push({ ...item })
        }
        if (item.nodes) {
            item.nodes.forEach((node: Node) => {
                this.DFSTreeRange(node)
            });
        }
    }

    DFSTreeLesserValue(item: Node) {
        if (item.total <= this.sugestedValue!) {
            this.sugestionCases.push({ ...item })
        }
        if (item.nodes) {
            item.nodes.forEach((node: Node) => {
                this.DFSTreeLesserValue(node)
            });
        }
    }

    DFSTreeExactValue(item: Node) {
        if (item.total === this.sugestedValue!) {
            this.sugestionCases.push({ ...item })
        }
        if (item.nodes) {
            item.nodes.forEach((node: Node) => {
                this.DFSTreeExactValue(node)
            });
        }
    }

    getRandomSugestion() {
        if (this.sugestionCases.length == 0) {
            throw new Error("Cannot generate sugestion")
        }
        const sugestion = this.sugestionCases[Math.floor(Math.random() * this.sugestionCases.length)];
        const listIds = sugestion!.sequencyIds.split(",")
        this.totalSugested = sugestion!.total
        this.productsSugestion = this.products.filter(product => listIds.includes(product.id.toString()))
    }

    getSugestion() {
        const root = this.sugestionTree.root
        if (!root) {
            throw new Error("Cannot generate sugestions")
        }
        this.DFSTreeExactValue(root)
        if (this.sugestionCases.length == 0) {
            this.DFSTreeRange(root)
        }
        if (this.sugestionCases.length == 0) {
            this.DFSTreeLesserValue(root)
        }
        this.getRandomSugestion()
        return this.productsSugestion
    }
}