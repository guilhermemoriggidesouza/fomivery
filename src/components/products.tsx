"use client"
import Product, { ProductsItemProps, ProductItem } from "./product"
export type ProductsProps = {
    products: ProductItem[]
    bgColor: string
}
export default function Products({ products, bgColor }: ProductsProps) {
    return (
        <ul className="first:pt-4 list-none	">
            {products.map((product: ProductItem) =>
                <Product
                    id={product.id}
                    description={product.description}
                    title={product.title}
                    value={product.value}
                    image={product.image}
                    bgColor={bgColor}
                />)}
        </ul>
    )
}