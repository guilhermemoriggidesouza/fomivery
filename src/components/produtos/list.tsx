"use client"
import Product from "~/domain/product";
import { Button } from "../ui/button";
import { ProductItem } from "./item";
import { useState } from "react";
import AddProductModal from "./add";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "../hooks/use-debounce";

export function ListProducts({ products }: { products: Product[] }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebounce(inputValue, 300);
    const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(debouncedValue.toLowerCase())
      );
    return (
        <div className="pb-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Produtos</h1>
                <Button onClick={() => {
                    setOpen(true)
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
                    <ProductItem product={product} />
                ))}
            </div>
            <AddProductModal open={open} setOpen={setOpen} />
        </div>
    )
}