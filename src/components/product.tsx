"use client"
export type ProductItem = {
    id: number
    description: string,
    title: string,
    value: string,
    image: string,
}
export type ProductsItemProps = {
    bgColor: string
} & ProductItem

export default function Product(product: ProductsItemProps) {
    return (
        <>
            <li className="px-4 pb-4" >
                <div className="p-2 rounded rounded-sm" style={{backgroundColor: product.bgColor }}>
                    <div className="flex justify-between">
                        <p className="text-xl font-bold	">{product.title}</p>
                        <div >
                            <span>R$ {product.value}</span>
                            {product.image && <span className="ml-4">foto</span>}
                        </div>

                    </div>
                    <p>{product.description}</p>
                </div>
            </li>
        </>
    )
}