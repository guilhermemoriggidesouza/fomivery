type SugestedProps = {
    onClose: () => void,
    bgColor: string,
    sugested: boolean,
    length: number,
    value: number
}
export default function SugestedBadge({ onClose, bgColor, sugested, length, value }: SugestedProps) {
    if (!sugested) return null
    return (
        <div className="flex p-2 justify-between mb-4" style={{ backgroundColor: bgColor }}>
            <p>
                Sugestões geradas: {length} <br /> Total: R$ {value?.toFixed(2)}
            </p>
            <span className="px-2 my-auto" onClick={onClose}>x</span>
        </div>
    )
}