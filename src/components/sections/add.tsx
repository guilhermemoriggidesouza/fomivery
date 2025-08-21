"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import FormSection from "./form";
import { api } from "~/trpc/react";
import Section from "~/domain/section";

interface SectionFormData {
    title: string;
}

export default function AddSectionModal({ open, setOpen, orgId, onAdd }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, orgId: number, onAdd: (section: Section) => void }) {
    const { mutate, isError, isPending } = api.section.create.useMutation({
        onError: (error) => {
            alert("Erro ao cadastrar produto")
        },
        onSuccess: (data) => {
            onAdd(data as Section)
        }
    })
    const addSection = (form: SectionFormData) => {
        mutate({
            ...form,
            orgId
        })
    }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar nova Seção</DialogTitle>
                </DialogHeader>
                <FormSection onSubmit={addSection} isLoading={isPending} />
            </DialogContent>
        </Dialog>
    );
}