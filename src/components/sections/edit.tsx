"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import FormSection from "./form";
import Section from "~/domain/section";

interface SectionFormData {
    title: string;
    orgId: number;
}

export default function EditSectionModal({ open, setOpen, section }: { section?: Section, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const addSection = (form: SectionFormData) => {

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Adicionar novo Produto</DialogTitle>
                </DialogHeader>
                <FormSection section={section} onSubmit={addSection} isLoading={false} />
            </DialogContent>
        </Dialog>
    );
}