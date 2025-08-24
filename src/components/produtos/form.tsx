"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import Product from "~/domain/product";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SelectionSections } from "./selection-sections";
import Section from "~/domain/section";
import Category from "~/domain/category";
import { SelectionCategories } from "./selection-category";

export interface ProductFormData {
    title: string;
    orgId: number;
    obrigatoryAdditional: boolean;
    value: number;
    description: string;
    sections: string[];
    categories: string[];
}

export default function FormProduct({ product, onSubmit, sections, categories }: { categories: Category[], sections: Section[], onSubmit: (form: ProductFormData) => void, product?: Product, }) {
    let initialForm
    if (product) {
        initialForm = {
            title: product.title,
            orgId: product.orgId,
            obrigatoryAdditional: product.obrigatoryAdditional,
            value: product.value ?? 0,
            description: product.description ?? '',
            sections: product.sections?.map(section => section.id.toString()) ?? [],
            categories: [],
        }
    } else {
        initialForm = {
            title: "",
            orgId: 0,
            obrigatoryAdditional: false,
            value: 0,
            description: "",
            sections: [],
            categories: [],
        }
    }
    const [form, setForm] = React.useState<ProductFormData>(initialForm);

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


            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="obrigatoryAdditional"
                            name="obrigatoryAdditional"
                            checked={Boolean(form.obrigatoryAdditional)}
                            onCheckedChange={(e) => {
                                setForm((prev) => ({
                                    ...prev,
                                    obrigatoryAdditional: Boolean(e)
                                }));
                            }}
                        />
                        <Label htmlFor="obrigatoryAdditional">Adicional é obrigatório?</Label>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Caso ativado, o produto vai exigir a escolha de uma adicional no carrinho</p>
                </TooltipContent>
            </Tooltip>

            <div className="mb-3">
                <SelectionSections selectedSections={product?.sections} sections={sections} setForm={setForm} />
            </div>
            <div className="mb-3">
                <SelectionCategories selectedCategories={product?.categories} categories={categories} setForm={setForm} />
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