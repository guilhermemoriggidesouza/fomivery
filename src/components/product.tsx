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
                <div className="flex items-center p-2 justify-between rounded rounded-sm" style={{ color: fontColor, backgroundColor: bgColor }}>
                    <div onClick={onClick} className="w-full transition ease-in-out transform active:scale-90">
                        <div className="flex justify-between">
                            <div className="flex justify-start items-center">
                                <span className="mx-2 mr-4 font-bold">{qtdBougth ? `(${qtdBougth})` : "+"}</span>
                                <p className="font-bold	inline-block mr-2" >{title}</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center">
                            <span className="inline-block text-nowrap">R$ {value.toFixed(2).replace(".", ",")}</span>
                        </div>
                        <p >{description}</p>
                    </div>
                    {image && (
                        <div
                            onClick={(e) => {
                                onClickImage(image)
                                e.stopPropagation()
                            }}
                            className="cursor-pointer h-12 w-12">
                            <img className="h-12 w-12 object-cover" src={image} />
                        </div>
                    )}
                </div>
            </li >
        </>
    )
}