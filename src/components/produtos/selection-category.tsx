"use client"
import Section from "~/domain/category";
import MultipleSelector, { Option } from "../ui/multi-selector";
import { ProductFormData } from "./form";

export function SelectionCategories({ selectedCategories, categories, setForm }: { selectedCategories?: Section[], categories: Section[], setForm: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
    return (
        <div className="flex w-full flex-col">
            <MultipleSelector
                value={selectedCategories?.map((category) => ({
                    value: category.id,
                    label: category.title
                } as unknown as Option))}
                onChange={(categories) => { setForm((prev) => ({ ...prev, categories: categories.map(category => category.value) })) }}
                defaultOptions={categories?.map((category) => ({
                    value: category.id,
                    label: category.title
                } as unknown as Option))}
                placeholder="Selecione as categorias que seu produto irá ficar"
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Nenhuma categoria selecionada
                    </p>
                }
            />
        </div>
    )
}