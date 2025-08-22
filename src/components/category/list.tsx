"use client"
import Category from "~/domain/category";
import { Button } from "../ui/button";
import { CategoryItem } from "./item";
import { useState } from "react";
import AddCategoryModal from "./add";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "../hooks/use-debounce";
import { api } from "~/trpc/react";

export type CategoryItem = Category & { new?: boolean }

export function ListCategory({ categories, orgId }: { categories: CategoryItem[], orgId: number }) {
    const [categoriesState, setCategoryState] = useState(categories)
    const [openAdd, setOpenAdd] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebounce(inputValue, 300);
    const filtered = categoriesState.filter((p) =>
        p.title.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    const { mutate: deleteCategory } = api.category.delete.useMutation({
        onSuccess: (id) => {
            const newCategory = categoriesState.filter(p => p.id !== id)
            setCategoryState([...newCategory])
        },
        onError: () => {
            alert("Erro ao deletar produto")
        }
    })

    const onDeleteCategory = (id: number) => {
        const confirmation = confirm("Deseja mesmo excluir esse produto?")
        if (!confirmation) return
        deleteCategory(id)
    }

    return (
        <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Categorias</h1>
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
                {filtered.map((category) => (
                    <CategoryItem category={category} onDeleteCategory={onDeleteCategory} />
                ))}
            </div>
            <AddCategoryModal open={openAdd} setOpen={setOpenAdd} orgId={orgId} onAdd={(category) => {
                const newCategory = [...categoriesState]
                newCategory.unshift({ ...category, new: true })
                setCategoryState(newCategory)
                setOpenAdd(false)
            }} />
        </div>
    )
}