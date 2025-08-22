"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Section from "~/domain/section";
import Loading from "../ui/loading";
import { Checkbox } from "../ui/checkbox";

export interface SectionFormData {
    title: string;
    orgId: number;
    isAditional: boolean
    min?: number
    max?: number
}

export default function FormSection({ section, onSubmit, isLoading }: { isLoading: boolean, onSubmit: (form: SectionFormData) => void, section?: Section, }) {
    let initialForm
    if (section) {
        initialForm = {
            title: section.title,
            orgId: section.orgId,
            isAditional: section.isAditional,
            min: section.minPerAddition,
            max: section.maxPerAddition,
        }
    } else {
        initialForm = {
            title: "",
            orgId: 0,
            isAditional: false
        }
    }
    const [form, setForm] = React.useState<SectionFormData>(initialForm);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(form)
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <Label htmlFor="title">Título</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="obrigatoryAdditional"
                    name="obrigatoryAdditional"
                    checked={Boolean(form.isAditional)}
                    onCheckedChange={(e) => {
                        setForm((prev) => ({
                            ...prev,
                            obrigatoryAdditional: Boolean(e)
                        }));
                    }}
                />
                <Label htmlFor="obrigatoryAdditional">É uma sessão de adicional?</Label>
            </div>

            {form.isAditional && (
                <>
                    <div>
                        <Label htmlFor="title">Mínimo de adicionais</Label>
                        <Input
                            type="number"
                            id="max"
                            name="max"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="title">Máximo de adicionais</Label>
                        <Input
                            type="number"
                            id="min"
                            name="min"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </>
            )}

            <div className="flex justify-end space-x-2">
                <Button disabled={isLoading} type="submit">{isLoading ? <Loading /> : 'Salvar'}</Button>
            </div>
        </form>
    );
}