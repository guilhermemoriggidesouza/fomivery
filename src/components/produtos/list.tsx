"use client"
import Product from "~/domain/product";
import { Button } from "../ui/button";
import { ProductItem } from "./item";
import { useEffect, useState } from "react";
import AddProductModal from "./add";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "../hooks/use-debounce";
import EditProductModal from "./edit";
import { api } from "~/trpc/react";
import Section from "~/domain/section";

export type ProductItem = Product & { new?: boolean }

export function ListProducts({ products, orgId, sections }: { sections: Section[], products: ProductItem[], orgId: number }) {
    const [productsState, setProductState] = useState(products)
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [productEdit, setProduct] = useState<Product | undefined>();
    const debouncedValue = useDebounce(inputValue, 300);
    const filtered = productsState.filter((p) =>
        p.title.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    const { mutate: deleteProduct } = api.product.delete.useMutation({
        onSuccess: (id) => {
            const newProducts = productsState.filter(p => p.id !== id)
            setProductState([...newProducts])
        },
        onError: () => {
            alert("Erro ao deletar produto")
        }
    })

    const onEditProduct = (product: Product) => {
        setProduct(product)
        setOpenEdit(true)
    }

    const onDeleteProduct = (id: number) => {
        const confirmation = confirm("Deseja mesmo excluir esse produto?")
        if (!confirmation) return
        deleteProduct(id)
    }

    return (
        <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Produtos</h1>
                <Button onClick={() => {
                    setOpenAdd(true)
                }}>Adicionar</Button>
            </div>
            <div className="relative w-full max-w-md mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar produto..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((product) => (
                    <ProductItem product={product} onEditProduct={onEditProduct} onDeleteProduct={onDeleteProduct} />
                ))}
            </div>
            <AddProductModal sections={sections} open={openAdd} setOpen={setOpenAdd} orgId={orgId} onAdd={(product) => {
                const newProducts = [...productsState]
                newProducts.unshift({ ...product, new: true })
                setProductState(newProducts)
                setOpenAdd(false)
            }} />
            <EditProductModal sections={sections} product={productEdit} open={openEdit} setOpen={setOpenEdit} orgId={orgId} />
        </div>
    )
}