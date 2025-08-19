"use client";

import * as React from "react";
import {
    DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import Product from "~/domain/product";

export interface ProductFormData {
    title: string;
    orgId: number;
    obrigatoryAdditional: boolean;
    value: number;
    description: string;
}

export default function FormProduct({ product, onSubmit }: { onSubmit: (form: ProductFormData) => void, product?: Product, }) {
    let initialForm
    if (product) {
        initialForm = {
            title: product.title,
            orgId: product.orgId,
            obrigatoryAdditional: product.obrigatoryAdditional,
            value: product.value ?? 0,
            description: product.description ?? '',
        }
    } else {
        initialForm = {
            title: "",
            orgId: 0,
            obrigatoryAdditional: false,
            value: 0,
            description: "",
        }
    }
    const [form, setForm] = React.useState<ProductFormData>(initialForm);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
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
                    checked={form.obrigatoryAdditional}
                />
                <Label htmlFor="obrigatoryAdditional">Adicional Obrigatório</Label>
            </div>

            <div>
                <Label htmlFor="value">Valor</Label>
                <Input
                    type="number"
                    step="0.01"
                    id="value"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                    type="text"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="submit">Salvar</Button>
            </div>
        </form>
    );
}