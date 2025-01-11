"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "~/context/themeProvider";
import ProductDomain from "~/domain/product";
export type ProductsItemProps = {
  onClick: (e: any) => void;
  onClickImage: (e: any) => void;
  qtdBougth?: number;
} & ProductDomain;

export default function Product({
  title,
  id,
  value,
  image,
  description,
  onClick,
  onClickImage,
  qtdBougth,
}: ProductsItemProps) {
  const {
    theme: { bgColor, fontColor },
  } = useContext(ThemeContext);
  return (
    <>
      <li id={`item-${id}`} className={`cursor-pointer px-4 pb-4`} key={id}>
        <div
          onClick={onClick}
          className="max-h-[120px] transform rounded rounded-md p-2 transition ease-in-out active:scale-90"
          style={{ color: fontColor, backgroundColor: bgColor }}
        >
          <div className="mb-2 flex items-center justify-start">
            <span className="mx-2 mr-4 font-bold">
              {qtdBougth ? `(${qtdBougth})` : "+"}
            </span>
            <p className="mr-2 line-clamp-1 font-bold">{title}</p>
          </div>
          <div className="flex">
            {image && (
              <div
                onClick={(e) => {
                  onClickImage({
                    image,
                    title,
                    description,
                    value: `R$ ${value.toFixed(2).replace(".", ",")}`,
                  });
                  e.stopPropagation();
                }}
                className="cursor-pointer"
              >
                <img
                  className="h-[70px] w-[70px] max-w-[70px] rounded rounded-md object-cover"
                  src={image}
                />
              </div>
            )}
            <div className={`${image && "ml-2"} w-full`}>
              <div className="flex items-center justify-start">
                <span className="inline-block text-nowrap">
                  R$ {value.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <p className="line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
