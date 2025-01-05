"use client"

import { useContext, useState } from "react"
import { ThemeContext } from "~/context/themeProvider"
import ProductDomain from "~/domain/product"
export type ProductsItemProps = {
    onClick: (e: any) => void,
    onClickImage: (e: any) => void,
    qtdBougth?: number
} & ProductDomain

export default function Product({ title, id, value, image, description, onClick, onClickImage, qtdBougth }: ProductsItemProps,) {
    const { theme: { bgColor, fontColor } } = useContext(ThemeContext)
    return (
        <>
            <li id={`item-${id}`} className={`cursor-pointer px-4 pb-4`} key={id} >
                <div onClick={onClick} className="p-2 max-h-[120px] rounded rounded-md transition ease-in-out transform active:scale-90" style={{ color: fontColor, backgroundColor: bgColor }}>
                    <div className="flex justify-start items-center mb-2">
                        <span className="mx-2 mr-4 font-bold">{qtdBougth ? `(${qtdBougth})` : "+"}</span>
                        <p className="font-bold mr-2 line-clamp-1" >{title}</p>
                    </div>
                    <div className="flex">
                        {image && (
                            <div
                                onClick={(e) => {
                                    onClickImage({ image, title, description, value: `R$ ${value.toFixed(2).replace(".", ",")}` })
                                    e.stopPropagation()
                                }}
                                className="cursor-pointer">
                                <img className="w-[70px] max-w-[70px] h-[70px] rounded rounded-md object-fill" src={image} />
                            </div>
                        )}
                        <div className={`${image && "ml-2"} w-full `}>
                            <div className="flex justify-start items-center">
                                <span className="inline-block text-nowrap">R$ {value.toFixed(2).replace(".", ",")}</span>
                            </div>
                            <p className="line-clamp-2" >{description}</p>
                        </div>
                    </div>
                </div>
            </li >
        </>
    )
}