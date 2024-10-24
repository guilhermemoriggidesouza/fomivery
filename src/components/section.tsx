"use client"

import { useContext } from "react"
import { ThemeContext } from "~/context/themeProvider"

export type SectionItem = {
    id: number
    title: string,
    selected: boolean,
}

export default function Section({ id, title, selected }: SectionItem) {
    const { theme: { bgColor, fontColor } } = useContext(ThemeContext)

    return (
        <>
            <p className={`${selected && "font-semibold"} block p-4`}>
                {selected && <span style={{
                    width: "12px",
                    display: "inline-block",
                    height: "12px",
                    backgroundColor: fontColor,
                    textAlign: "center",
                    marginRight: "12px",
                    borderRadius: "100%"
                }}></span>}
                {title}
            </p>
        </>
    )
}