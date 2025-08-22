"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import FormSection, { SectionFormData } from "./form";
import Section from "~/domain/section";
import { api } from "~/trpc/react";

export default function EditSectionModal({ open, setOpen, section, orgId }: { orgId: number, section?: Section, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { mutate, isError, isPending } = api.section.edit.useMutation({
        onError: (error) => {
            alert("Erro ao editar produto")
        },
        onSuccess: (data) => {
            setOpen(false)
        }
    })
    const editSection = (form: SectionFormData) => {
        mutate({
            ...form,
            id: section!.id,
            orgId
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Editar sessão</DialogTitle>
                </DialogHeader>
                <FormSection section={section} onSubmit={editSection} isLoading={isPending} />
            </DialogContent>
        </Dialog>
    );
}