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
import { api } from "~/trpc/react";
import Product from "~/domain/product";
import Section from "~/domain/section";

export default function AddProductModal({ open, setOpen, orgId, onAdd, sections }: { sections: Section[], open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, orgId: number, onAdd: (product: Product) => void }) {
    const { mutate, isError, } = api.product.create.useMutation({
        onError: (error) => {
            alert("Erro ao cadastrar produto")
        },
        onSuccess: (data) => {
            onAdd(data as Product)
        }
    })
    const addProduct = (form: ProductFormData) => {
        mutate({
            ...form,
            sections: form.sections.map(sec => Number(sec)),
            orgId
        })
    }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar novo Produto</DialogTitle>
                </DialogHeader>
                <FormProduct onSubmit={addProduct} sections={sections} />
            </DialogContent>
        </Dialog>
    );
}