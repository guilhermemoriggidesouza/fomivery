"use client"

import ProductDomain from "~/domain/product"

export type ProductsItemProps = {
    bgColor: string
} & ProductDomain

export default function Product(product: ProductsItemProps) {
    return (
        <>
            <li className="px-4 pb-4" key={product.id} >
                <div className="p-2 rounded rounded-sm" style={{ backgroundColor: product.bgColor }}>
                    <div className="flex justify-between">
                        <p className="font-bold	inline-block mr-2" >{product.title}</p>
                        <div >
                            <span className="inline-block">R$ {product.value}</span>
                            {product.image && <span className="ml-4 inline-block font subline">foto</span>}
                        </div>

                    </div>
                    <p >{product.description}</p>
                </div>
            </li>
        </>
    )
}