"use client";

import * as React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import FormProduct from "./form";
import Product from "~/domain/product";
import { Button } from "../ui/button";

interface ProductFormData {
    title: string;
    orgId: number;
    obrigatoryAdditional: boolean;
    value: number;
    description: string;
}

export default function EditProductModal({ open, setOpen, product }: { product?: Product, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const addProduct = (form: ProductFormData) => {

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar novo Produto</DialogTitle>
                </DialogHeader>
                <FormProduct product={product} onSubmit={addProduct} />
                <DialogClose asChild>
                    <Button variant="outline" type="button">
                        Cancelar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}