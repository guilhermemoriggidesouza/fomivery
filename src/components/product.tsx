"use client"

import ProductDomain from "~/domain/product"

export type ProductsItemProps = {
    bgColor: string
    onClick: (e: any) => void,
} & ProductDomain

export default function Product({ title, id, value, image, description, bgColor, onClick }: ProductsItemProps,) {
    return (
        <>
            <li id={`item-${id}`} className={`px-4 pb-4 transform active:scale-90`} key={id} >
                <div className="p-2 rounded rounded-sm" onClick={onClick} style={{ backgroundColor: bgColor }}>
                    <div className="flex justify-between">
                        <p className="font-bold	inline-block mr-2" >{title}</p>
                        <div >
                            <span className="inline-block">R$ {value}</span>
                            {image && <span className="ml-4 inline-block font subline">foto</span>}
                        </div>

                    </div>
                    <p >{description}</p>
                </div>
            </li>
        </>
    )
}