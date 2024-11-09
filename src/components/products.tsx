"use client"
import ProductDomain from "~/domain/product"
import Product from "./product"
import { useState } from "react"
import { ImageModal } from "./image"
export type ProductsProps = {
    products: ProductDomain[]
    boughtProducts?: ProductDomain[]
    onAddProduct: (p: ProductDomain) => void
}

export default function Products({ products, boughtProducts, onAddProduct }: ProductsProps) {
    const [imageModal, setImageModal] = useState<string | undefined>()

    const getQtdBougth = (product: ProductDomain) => {
        const bougthProduct = boughtProducts?.find(bp => bp.id == product.id)
        return bougthProduct?.quantity
    }
    return (
        <>
            <ul className="first:pt-4 list-none	">
                {products.map((product: ProductDomain) => {
                    return <Product
                        key={product.id}
                        {...product}
                        onClick={(e) => onAddProduct(product)}
                        onClickImage={(image) => setImageModal(image)}
                        qtdBougth={getQtdBougth(product)}
                    />
                }
                )}
                <li key={products.length + 1} style={{ width: "120px", height: "120px" }}></li>
            </ul>
            <ImageModal
                open={imageModal}
                onOpenChange={() => setImageModal(undefined)}
            >
                <img src={imageModal} className="w-full h-full object-contain" />
            </ImageModal>
        </>
    )
}