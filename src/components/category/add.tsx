"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import FormCategory, { CategoryFormData } from "./form";
import { api } from "~/trpc/react";
import Category from "~/domain/category";

export default function AddCategoryModal({ open, setOpen, orgId, onAdd }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, orgId: number, onAdd: (category: Category) => void }) {
    const { mutate, isError, isPending } = api.category.create.useMutation({
        onError: (error) => {
            alert("Erro ao cadastrar produto")
        },
        onSuccess: (data) => {
            onAdd(data as Category)
        }
    })
    const addCategory = (form: CategoryFormData) => {
        mutate({
            ...form,
            orgId
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar nova Categoria</DialogTitle>
                </DialogHeader>
                <FormCategory onSubmit={addCategory} isLoading={isPending} />
            </DialogContent>
        </Dialog>
    );
}