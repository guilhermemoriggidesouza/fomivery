"use client"
import ProductDomain from "~/domain/product"
import Product from "./product"
import { RefObject, useRef, useState } from "react"
export type ProductsProps = {
    products: ProductDomain[]
    bgColor: string,
    onAddProduct: (p: ProductDomain) => void
}

export default function Products({ products, bgColor, onAddProduct }: ProductsProps) {

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
                    onClick={(e) => onAddProduct(product)}
                />
            )}
            <li key={products.length + 1} style={{ width: "120px", height: "120px" }}></li>
        </ul>
    )
}