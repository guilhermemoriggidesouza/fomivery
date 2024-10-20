import Product from "./product";

export class FuckingHashTreeSearchable {
    root: Node | undefined
    products: Product[]
    genNode(product: Product, item?: Node) {
        const sequencyIds = item ? `${item.sequencyIds},${product.id}` : product.id.toString()
        const total = (item?.total || 0)
        const node = new Node(product.id, product.value, (product.value + total), sequencyIds)
        return node
    }
    alreadyAdd(product: Product, item: Node) {
        if (item) {
            const used = item.sequencyIds.split(",").find(id => id == product.id.toString())
            return Boolean(used)
        }
        return false
    }
    buildTree(products: Product[], item: Node): Node | undefined {
        products.shift()
        for (let index = 0; index < products.length; index++) {
            const nodeChild = this.genNode(products[index]!, item)
            const nodeBf = this.buildTree([...products], nodeChild)
            if (nodeBf && !this.alreadyAdd(products[index]!, item)) {
                item.nodes.push(nodeBf)
            }
        }

        return item
    }
    constructor(products: Product[]) {
        this.products = products
        const product = this.products[0]
        const root = this.genNode(product!)
        this.root = this.buildTree([...this.products], root)
    }
}

export class Node {
    constructor(public id: number, public value: number, public total: number, public sequencyIds: string, public nodes: Node[] = []) { }
}