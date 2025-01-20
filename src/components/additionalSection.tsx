import Product from "~/domain/product";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { FormEvent, useState } from "react";
import { Additional } from "~/domain/additional";

export const AdditionalSection = ({
  additionals,
  maxAdditional,
  setControl,
}: {
  additionals: Additional[];
  setControl: (additionals: Additional[]) => void;
  maxAdditional: number;
}) => {
  const [additionalAdded, setAdditionalsAdded] = useState<Additional[]>([]);
  const handlerAddAdditional = (
    additional: Additional,
    e: FormEvent<HTMLButtonElement>,
  ) => {
    if (additionalAdded.length >= maxAdditional) {
      alert("Você ja adicionou o maximo de adicionais possíveis");
      e.preventDefault();
      return;
    }
    const newProducts = [...additionalAdded];
    newProducts.push(additional);
    setAdditionalsAdded(newProducts);
    setControl(newProducts);
  };

  const handlerRemoveAdditional = (additional: Additional) => {
    setAdditionalsAdded((adp) => {
      const newAdp = adp.filter(
        (item) => item.product.id !== additional.product.id,
      );
      setControl(newAdp);
      return newAdp;
    });
  };

  return (
    <div>
      {additionals.map((additional, i) => (
        <>
          <div className="flex items-center" key={i}>
            <Checkbox
              id="delivery"
              className="mr-1"
              onClick={(e: FormEvent<HTMLButtonElement>) => {
                if (e.currentTarget.getAttribute("aria-checked") != "true") {
                  handlerAddAdditional(additional, e);
                } else {
                  handlerRemoveAdditional(additional);
                }
              }}
            />
            <Label
              htmlFor="delivery"
              className="ml-1 mr-2 flex min-h-[50px] items-center gap-1"
            >
              <span>
                {additional.product.image && (
                  <img
                    src={additional.product.image}
                    style={{ width: "40px" }}
                  />
                )}
              </span>
              <span>
                {additional.product.value && additional.product.value > 0
                  ? `[R$ ${additional.product.value?.toFixed(2).replaceAll(".", ",")}]`
                  : ""}
              </span>
              <div className="block ml-4">
                <p>{additional.product.title}</p>
                {additional.product.description && (
                  <i>
                    <small>{additional.product.description}</small>
                  </i>
                )}
              </div>
            </Label>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};
