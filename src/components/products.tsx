"use client";
import ProductDomain from "~/domain/product";
import Product from "./product";
import { useState } from "react";
import { ImageModal } from "./modal/image";
import { title } from "process";
export type ProductsProps = {
  products: ProductDomain[];
  boughtProducts?: ProductDomain[];
  onAddProduct: (p: ProductDomain) => void;
};

export default function Products({
  products,
  boughtProducts,
  onAddProduct,
}: ProductsProps) {
  const [imageModal, setImageModal] = useState<any | undefined>();

  const getQtdBougth = (product: ProductDomain) => {
    const bougthProduct = boughtProducts?.find((bp) => bp.id == product.id);
    return bougthProduct?.quantity;
  };
  return (
    <>
      <ul className="list-none first:pt-4">
        {products.map((product: ProductDomain) => {
          return (
            <Product
              key={product.id}
              {...product}
              onClick={(e) => onAddProduct(product)}
              onClickImage={(product) => setImageModal(product)}
              qtdBougth={getQtdBougth(product)}
            />
          );
        })}
        <li
          key={products.length + 1}
          style={{ width: "120px", height: "120px" }}
        ></li>
      </ul>
      <ImageModal
        open={imageModal}
        title={`${imageModal?.title}, ${imageModal?.value}`}
        description={imageModal?.description}
        onOpenChange={() => setImageModal(undefined)}
      >
        <>
          <img
            src={imageModal?.image}
            className="h-full w-full object-contain"
          />
        </>
      </ImageModal>
    </>
  );
}
