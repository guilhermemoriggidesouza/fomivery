"use client"
import ProductDomain from "~/domain/product"
import Product from "./product"
export type ProductsProps = {
    products: ProductDomain[]
    bgColor: string
}
export default function Products({ products, bgColor }: ProductsProps) {
    return (
        <ul className="first:pt-4 list-none	">
            {products.map((product: ProductDomain) =>
                <Product
                    key={product.id}
                    id={product.id}
                    description={product.description}
                    title={product.title}
                    value={product.value}
                    image={product.image}
                    sectionId={product.sectionId}
                    bgColor={bgColor}
                />
            )}
            <li key={products.length + 1} style={{ width: "120px", height: "120px" }}></li>
        </ul>
    )
}