"use client"

import { Trash } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CategoryItem as CategoryItemType } from "./list";

export function CategoryItem({ category, onDeleteCategory }: { category: CategoryItemType, onDeleteCategory?: (id: number) => void }) {
    return (
        <Card id={`produto-${category.id}`} key={category.id}>
            {category.new && <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full -ml-[25px] -translate-y-[15px]">
                Novo
            </span>}
            <CardHeader className={`flex flex-row justify-between items-center ${category.new && "!pt-0"}`}>
                <CardTitle>{category.title}</CardTitle>
                <div className="flex">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteCategory && onDeleteCategory(category.id)}
                    >
                        <Trash className="h-5 w-5 text-red-600" />
                    </Button>
                </div>
            </CardHeader>
        </Card>

    )
}