"use client"

import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Product from "~/domain/product";

export function ProductItem({ product, onDeleteProduct }: { product: Product, onDeleteProduct?: () => void }) {
    return (
        <Card key={product.id}>
            <CardHeader className="flex flex-row gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteProduct && onDeleteProduct()}
                >
                    <Trash className="h-5 w-5 text-red-600" />
                </Button>
                <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>{product.description}</CardContent>
        </Card>

    )
}