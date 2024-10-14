"use client"

export type SectionItem = {
    id: number
    title: string,
    selected: boolean,
}

export default function Section({ id, title, selected }: SectionItem) {

    return (
        <>
            <p className={`${selected && "font-semibold"} block p-4`}>
                {selected && <span style={{
                    width: "12px",
                    display: "inline-block",
                    height: "12px",
                    opacity: 0.5,
                    backgroundColor: "black",
                    textAlign: "center",
                    marginRight: "12px",
                    borderRadius: "100%"
                }}></span>}
                {title}
            </p>
        </>
    )
}