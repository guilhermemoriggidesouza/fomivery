"use client"
export type SectionProps = {
    id: number
    title: string,
}

export default function Section(section: SectionProps) {
    return (
        <>
            <li className="inline-block" >
                <span className="text-lg block p-4">{section.title}</span>
            </li>
        </>
    )
}