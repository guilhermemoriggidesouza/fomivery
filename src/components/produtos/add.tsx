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
import { Button } from "../ui/button";
import { api } from "~/trpc/react";

interface ProductFormData {
    title: string;
    orgId: number;
    obrigatoryAdditional: boolean;
    value: number;
    description: string;
}

export default function AddProductModal({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { mutate } = api.product.create.useMutation()
    const addProduct = (form: ProductFormData) => {
        mutate({
            ...form
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar novo Produto</DialogTitle>
                </DialogHeader>
                <FormProduct onSubmit={addProduct} />
            </DialogContent>
        </Dialog>
    );
}