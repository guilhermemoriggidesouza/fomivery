"use client"
import Section from "~/domain/section";
import MultipleSelector, { Option } from "../ui/multi-selector";
import { ProductFormData } from "./form";

export function SelectionSections({ selectedSections, sections, setForm }: { selectedSections?: Section[], sections: Section[], setForm: React.Dispatch<React.SetStateAction<ProductFormData>> }) {
    return (
        <div className="flex w-full flex-col">
            <MultipleSelector
                value={selectedSections?.map((section) => ({
                    value: section.id,
                    label: `[${section.isAditional ? 'Adicional' : 'Topo'}] ${section.title}`
                } as unknown as Option))}
                onChange={(sections) => { setForm((prev) => ({ ...prev, sections: sections.map(section => section.value) })) }}
                defaultOptions={sections?.map((section) => ({
                    value: section.id,
                    label: `[${section.isAditional ? 'Adicional' : 'Topo'}] ${section.title}`
                } as unknown as Option))}
                placeholder="Selecione as sessões que seu produto irá ficar"
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Nenhuma sessão selecionada
                    </p>
                }
            />
        </div>
    )
}