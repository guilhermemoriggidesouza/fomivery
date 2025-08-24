"use client"
import Section from "~/domain/section";
import { Button } from "../ui/button";
import { SectionItem } from "./item";
import { useEffect, useState } from "react";
import AddSectionModal from "./add";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "../hooks/use-debounce";
import EditSectionModal from "./edit";
import { api } from "~/trpc/react";

export type SectionItem = Section & { new?: boolean }

export function ListSection({ sections, orgId }: { sections: SectionItem[], orgId: number }) {
    const [sectionsState, setSectionState] = useState(sections)
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [sectionEdit, setSection] = useState<Section | undefined>();
    const debouncedValue = useDebounce(inputValue, 300);
    const filtered = sectionsState.filter((p) =>
        p.title.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    const { mutate: deleteSection } = api.section.delete.useMutation({
        onSuccess: (id) => {
            const newSection = sectionsState.filter(p => p.id !== id)
            setSectionState([...newSection])
        },
        onError: () => {
            alert("Erro ao deletar produto")
        }
    })

    const onEditSection = (section: Section) => {
        setSection(section)
        setOpenEdit(true)
    }

    const onDeleteSection = (id: number) => {
        const confirmation = confirm("Deseja mesmo excluir esse produto?")
        if (!confirmation) return
        deleteSection(id)
    }

    return (
        <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Sessões</h1>
                <h1 className="text-lg font-semibold">As sessões podem ser classificadas 2 tipos, as sessões de topo que são exibidas no topo da tela para organizar o cardap.io para o seu cliente<br /> e as sessões de adicionais, que ao associadas ao produto, permitem que o cliente customize seu pedido, da forma como lhe agrada</h1>
                <Button onClick={() => {
                    setOpenAdd(true)
                }}>Adicionar</Button>
            </div>
            <div className="relative w-full max-w-md mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar sessão..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((section) => (
                    <SectionItem section={section} onEditSection={onEditSection} onDeleteSection={onDeleteSection} />
                ))}
            </div>
            <AddSectionModal open={openAdd} setOpen={setOpenAdd} orgId={orgId} onAdd={(section) => {
                const newSection = [...sectionsState]
                newSection.unshift({ ...section, new: true })
                setSectionState(newSection)
                setOpenAdd(false)
            }} />
            <EditSectionModal section={sectionEdit} open={openEdit} setOpen={setOpenEdit} orgId={orgId} />
        </div>
    )
}