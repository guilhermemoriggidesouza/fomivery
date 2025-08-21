"use client"

import { Pencil, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Section from "~/domain/section";
import { SectionItem as SectionItemType } from "./list";

export function SectionItem({ section, onDeleteSection, onEditSection }: { section: SectionItemType, onDeleteSection?: (id: number) => void, onEditSection?: (section: Section) => void }) {
    return (
        <Card id={`produto-${section.id}`} key={section.id}>
            {section.new && <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full -ml-[25px] -translate-y-[15px]">
                Novo
            </span>}
            <CardHeader className={`flex flex-row justify-between items-center ${section.new && "!pt-0"}`}>
                <CardTitle>{section.title}</CardTitle>
                <div className="flex">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteSection && onDeleteSection(section.id)}
                    >
                        <Trash className="h-5 w-5 text-red-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditSection && onEditSection(section)}
                    >
                        <Pencil className="h-5 w-5" />
                    </Button>
                </div>
            </CardHeader>
        </Card>

    )
}