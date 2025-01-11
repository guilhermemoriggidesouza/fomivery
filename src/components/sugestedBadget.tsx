import { useContext } from "react";
import { ThemeContext } from "~/context/themeProvider";

type SugestedProps = {
  onClose: () => void;
  sugested: boolean;
  length: number;
  value: number;
};
export default function SugestedBadge({
  onClose,
  sugested,
  length,
  value,
}: SugestedProps) {
  const {
    theme: { bgColor, fontColor },
  } = useContext(ThemeContext);

  if (!sugested) return null;
  return (
    <div
      className="mb-4 flex justify-between p-2"
      style={{ backgroundColor: bgColor, color: fontColor }}
    >
      <p>
        Sugestões geradas: {length} <br /> Total: R$ {value?.toFixed(2)}
      </p>
      <span className="my-auto px-2" onClick={onClose}>
        x
      </span>
    </div>
  );
}
