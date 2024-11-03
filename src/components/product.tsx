"use client"

import { useContext, useState } from "react"
import { ThemeContext } from "~/context/themeProvider"
import ProductDomain from "~/domain/product"
export type ProductsItemProps = {
    onClick: (e: any) => void,
    onClickImage: (e: any) => void,
} & ProductDomain

export default function Product({ title, id, value, image, description, onClick, onClickImage }: ProductsItemProps,) {
    const { theme: { bgColor, fontColor } } = useContext(ThemeContext)
    return (
        <>
            <li id={`item-${id}`} className={`px-4 pb-4 transition ease-in-out transform active:scale-90`} key={id} >
                <div className="p-2 rounded rounded-sm" onClick={onClick} style={{ color: fontColor, backgroundColor: bgColor }}>
                    <div className="flex justify-between">
                        <div className="flex justify-start items-center">
                            <span className="mx-2 mr-4">+</span>
                            <p className="font-bold	inline-block mr-2" >{title}</p>
                        </div>
                        {(image != "") && (
                            <div
                                onClick={(e) => {
                                    onClickImage(image)
                                    console.log(image)
                                    e.stopPropagation()
                                }}
                                className="cursor-pointer rounded rounded-full align-start h-12 w-12 flex justify-center items-center font subline">
                                <svg style={{ color: fontColor }} className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 1H15V15H1V1ZM6 9L8 11L13 6V13H3V12L6 9ZM6.5 7C7.32843 7 8 6.32843 8 5.5C8 4.67157 7.32843 4 6.5 4C5.67157 4 5 4.67157 5 5.5C5 6.32843 5.67157 7 6.5 7Z" fill="#000000" />
                                </svg>
                            </div>)}
                    </div>
                    <div className="flex justify-start items-center">
                        <span className="inline-block text-nowrap">R$ {value.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <p >{description}</p>
                </div>
            </li >
        </>
    )
}