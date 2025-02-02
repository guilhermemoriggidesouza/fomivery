"use client";
import ProductDomain, { BoughtProductType } from "~/domain/product";
import Product from "./product";
import { useState } from "react";
import { ImageModal } from "./modal/image";
import { title } from "process";
export type ProductsProps = {
  products: ProductDomain[];
  boughtProducts?: BoughtProductType[];
  onAddProduct: (p: ProductDomain) => void;
};

export default function Products({
  products,
  boughtProducts,
  onAddProduct,
}: ProductsProps) {
  const [imageModal, setImageModal] = useState<any | undefined>();

  const getQtdBougth = (product?: BoughtProductType) => {
    let bougthProduct = 0;
    if (!product) {
      return 0;
    }
    boughtProducts?.forEach((bp) => {
      if (bp.id == product.id) {
        bougthProduct += bp.quantity!;
      }
    });
    return bougthProduct;
  };
  return (
    <>
      <ul className="list-none first:pt-4">
        {products.map((product: ProductDomain) => {
          const bougthProduct = boughtProducts?.find(
            (bp) => bp.id == product.id,
          );
          return (
            <Product
              key={product.id}
              {...product}
              onClick={(e) => onAddProduct(product)}
              onClickImage={(product) => setImageModal(product)}
              qtdBougth={getQtdBougth(bougthProduct)}
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
        title={`${imageModal?.title}, ${imageModal?.price}`}
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
