"use client"

import { Pencil, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Product from "~/domain/product";
import { ProductItem as ProductItemType } from "./list";

export function ProductItem({ product, onDeleteProduct, onEditProduct }: { product: ProductItemType, onDeleteProduct?: (id: number) => void, onEditProduct?: (product: Product) => void }) {
    return (
        <Card id={`produto-${product.id}`} key={product.id}>
            {product.new && <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full -ml-[25px] -translate-y-[15px]">
                Novo
            </span>}
            <CardHeader className={`flex flex-row justify-between items-center ${product.new && "!pt-0"}`}>
                <CardTitle>{product.title}</CardTitle>
                <div className="flex">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                    >
                        <Trash className="h-5 w-5 text-red-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditProduct && onEditProduct(product)}
                    >
                        <Pencil className="h-5 w-5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>{product.description}</CardContent>
        </Card>

    )
}