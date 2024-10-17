import Product from "./product";

export default class Menu {
    totalSugested: number = 0
    productsSugested: Product[]
    constructor(public products: Product[], public sugestedValue?: number, public sugestedAmmount?: number) {
        this.productsSugested = [...products]
    }

    recursionItem(listProducts: Product[], visualized: Set<number>, amountMissing: number, alreadySeensProduct: Product[] = []): Product | undefined {
        const unvisualizedList = listProducts.filter(product => !visualized.has(product.id))
        const randomElement: Product | undefined = unvisualizedList[Math.floor(Math.random() * unvisualizedList.length)];
        let newItem = { ...randomElement } as Product
        if (newItem) {
            const highestValue = this.sugestedValue! * 1.1
            const acummulatedValue = Number(newItem!.value) + this.totalSugested
            const lowerValue = (this.sugestedValue! - this.totalSugested) / amountMissing
            if ((acummulatedValue > highestValue || Number(newItem!.value) < lowerValue)) {
                alreadySeensProduct.push(newItem)
                return this.recursionItem(listProducts, visualized, amountMissing, alreadySeensProduct)
            }

            return newItem
        }
    }

    sugestByValue(
        listProducts: Product[],
        idsUsed: number[] = []
    ): Product[] {
        const newArray: Product[] = []
        for (let index = 0; index < this.sugestedAmmount!; index++) {
            if ((index >= listProducts.length) || (this.totalSugested > this.sugestedValue!)) {
                return newArray
            }
            const visualized = new Set(idsUsed)
            const amountMissing = this.sugestedAmmount! - newArray.length
            const newItem = this.recursionItem(listProducts, visualized, amountMissing)
            if (newItem) {
                newArray.push(newItem)
                idsUsed.push(newItem.id)
                this.totalSugested += Number(newItem.value)
            }
        }
        return newArray
    }

    generateListInRange() {
        const highestValue = ((this.sugestedValue! * 1.1) / this.sugestedAmmount!)
        const lessValue = ((this.sugestedValue! * 0.9) / this.sugestedAmmount!)
        const productsInRange = this.products.filter(product => Number(product.value) < highestValue && Number(product.value) > lessValue)
        return productsInRange
    }

    decreaseSugestionAmmount(decValue: number) {
        this.sugestedAmmount! -= decValue
    }

    isProductGreater(product: Product) {
        return Number(product.value) < this.sugestedValue!
    }

    fallbackSugestion(
        productsCandidate: Product[]
    ) {
        this.decreaseSugestionAmmount(productsCandidate.length)
        const idsUsed = productsCandidate.map(item => item.id)
        const newSugestion = this.products.filter(product => !idsUsed.includes(product.id) && this.isProductGreater(product))
        const newSugested = this.sugestByValue(
            newSugestion,
            idsUsed
        )
        return productsCandidate.concat(newSugested)
    }

    getSugestion() {
        const productsInRange = this.generateListInRange()

        if (productsInRange.length == 0) {
            this.productsSugested = this.sugestByValue(this.products)
        } else {
            let productsCandidate = this.sugestByValue(
                productsInRange
            )
            if (this.totalSugested < this.sugestedValue!) {
                productsCandidate = this.fallbackSugestion(productsCandidate)
            }
            this.productsSugested = productsCandidate
        }
        return this.productsSugested
    }
}