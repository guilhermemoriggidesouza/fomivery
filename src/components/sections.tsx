"use client"
import Section, { SectionProps } from "./section"
export type SectionsProps = {
    sections: SectionProps[],
    bgColor: string
}
export default function Sections({ sections, bgColor }: SectionsProps) {
    return (
        <ul className="list-none m-4 rounded rounded-sm whitespace-nowrap overflow-x-scroll" style={{ backgroundColor: bgColor }}>
            {sections.map((section: SectionProps) =>
                <Section
                    {...section}
                />)}
        </ul>
    )
}