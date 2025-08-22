"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Category from "~/domain/category";
import Loading from "../ui/loading";

export interface CategoryFormData {
    title: string;
    color: string;
    orgId: number;
}

export default function FormCategory({ category, onSubmit, isLoading }: { isLoading: boolean, onSubmit: (form: CategoryFormData) => void, category?: Category, }) {
    let initialForm
    if (category) {
        initialForm = {
            title: category.title,
            orgId: category.orgId,
            color: category.color,
        }
    } else {
        initialForm = {
            title: '',
            orgId: 0,
            color: '#000',
        }
    }
    const [form, setForm] = React.useState<CategoryFormData>(initialForm);

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
            <div className="flex flex-col space-y-2">
                <Label htmlFor="color">Escolha a cor da categoria</Label>
                <Input
                    type="color"
                    id="color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className="w-16 h-10 p-1 cursor-pointer"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button disabled={isLoading} type="submit">{isLoading ? <Loading /> : 'Salvar'}</Button>
            </div>
        </form>
    );
}