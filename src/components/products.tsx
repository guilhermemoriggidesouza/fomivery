"use client"
import ProductDomain from "~/domain/product"
import Product from "./product"
export type ProductsProps = {
    products: ProductDomain[]
    onAddProduct: (p: ProductDomain) => void
}

export default function Products({ products, onAddProduct }: ProductsProps) {

    return (
        <ul className="first:pt-4 list-none	">
            {products.map((product: ProductDomain) =>
                <Product
                    key={product.id}
                    {...product}
                    onClick={(e) => onAddProduct(product)}
                />
            )}
            <li key={products.length + 1} style={{ width: "120px", height: "120px" }}></li>
        </ul>
    )
}