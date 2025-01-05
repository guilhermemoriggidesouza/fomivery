"use client"
import { ThemeContext } from "~/context/themeProvider"
import Section, { SectionItem } from "./section"
import { useContext, useEffect, useRef, useState } from "react"

export type SectionsProps = {
    sections: SectionItem[],
    changeSection: (id: number) => void
}
export default function Sections({ sections, changeSection }: SectionsProps) {
    const refli = useRef<HTMLLIElement | null>(null)
    const reful = useRef<HTMLUListElement | null>(null)
    const { theme: { bgColor, fontColor } } = useContext(ThemeContext)

    useEffect(() => {
        if (refli.current && reful.current) {
            let scrollLeft = refli.current.offsetLeft
            reful.current?.scrollTo({ behavior: "smooth", top: 0, left: scrollLeft })
        }
    }, [refli?.current, sections])
    
    return (
        <ul
            id="list-product"
            ref={reful}
            className="list-none flex relative block whitespace-nowrap overflow-x-visible overflow-y-hidden"
            style={{ color: fontColor, backgroundColor: bgColor }}
        >
            {sections.map((section: SectionItem) =>
                <li onClick={() => changeSection(section.id)} id={`li-${section.id}`} ref={section.selected ? refli : null} key={section.id} className="cursor-pointer transition ease-in-out transform active:scale-90 inline-block">
                    <Section
                        {...section}
                    />
                </li>
            )}
        </ul>
    )
}