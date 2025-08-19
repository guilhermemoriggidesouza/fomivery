"use client"

import { Pencil, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Product from "~/domain/product";

export function ProductItem({ product, onDeleteProduct, onEditProduct }: { product: Product, onDeleteProduct?: (id: number) => void, onEditProduct?: (product: Product) => void }) {
    return (
        <Card key={product.id}>
            <CardHeader className="flex flex-row justify-between items-center">
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