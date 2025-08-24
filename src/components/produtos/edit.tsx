"use client";

import * as React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import FormProduct, { ProductFormData } from "./form";
import Product from "~/domain/product";
import Section from "~/domain/section";
import { api } from "~/trpc/react";
import Category from "~/domain/category";

export default function EditProductModal({ open, setOpen, product, sections, orgId, categories }: { categories: Category[], orgId: number, sections: Section[], product?: Product, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { mutate, isError, isPending } = api.product.edit.useMutation({
        onError: (error) => {
            alert("Erro ao editar produto")
        },
        onSuccess: (data) => {
            setOpen(false)
        }
    })
    const editProduct = (form: ProductFormData) => {
        mutate({
            ...form,
            id: product!.id,
            sections: form.sections.map(sec => Number(sec)),
            categories: form.categories.map(cat => Number(cat)),
            orgId
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar novo Produto</DialogTitle>
                </DialogHeader>
                <FormProduct product={product} onSubmit={editProduct} sections={sections} categories={categories} />
            </DialogContent>
        </Dialog>
    );
}