import Product from "./product";

export class FuckingHashTreeSearchable {
    root: Node | undefined
    products: Product[]

    buildTree(item: Node, products: Product[]): Node | undefined {
        const product = products.shift();
        if (product) {
            const node = new Node(product.id, product.value, (product.value + item.total))
            const nodes: Node[] = []
            for (let index = 0; index < products.length; index++) {
                const nodeBf = this.buildTree(node, [...products])
                if (nodeBf) {
                    nodes.push(nodeBf)
                }
            }
            node.nodes = nodes
            return node
        }
    }
    constructor(products: Product[]) {
        this.products = products
        const item = products[0]!
        const root = new Node(item.id, item.value, item.value)
        this.root = this.buildTree(root, [...products])
    }
}

export class Node {
    constructor(public id: number, public value: number, public total: number, public nodes?: Node[]) { }
}