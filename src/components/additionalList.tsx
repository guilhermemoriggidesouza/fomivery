"use client";
import Loading from "./ui/loading";
import { Dispatch, SetStateAction, useState } from "react";
import { AdditionalSection as AditionalSectionComponent } from "./additionalSection";
import { Additional } from "~/domain/additional";
import Section from "~/domain/section";

export type AdditionalProps = {
  loading: boolean;
  obrigatory: boolean;
  additionalSection: Section[];
  setAdditionalSection: Dispatch<SetStateAction<Section[]>>;
};

export const AdditionalList = ({
  loading,
  additionalSection,
  obrigatory,
  setAdditionalSection,
}: AdditionalProps) => {
  const setControl = (
    products: Additional[],
    addSection: Section,
  ) => {
    setAdditionalSection((addControls) => {
      const newAddControls = [...addControls];
      let addItem = newAddControls.find((item) => item.id == addSection.id);
      if (!addItem) {
        newAddControls.push({ ...addSection });
        addItem = { ...addSection };
      }
      addItem!.additionalProducts = products;
      const item = newAddControls.map((item) => {
        if (item.id == addSection.id) {
          return addItem;
        }
        return item;
      });

      return item;
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {obrigatory && <p>Adicionais obrigatorios para esse produto!</p>}
          {additionalSection?.map((additionalS, i) => (
            <div className="mt-5" key={i}>
              <b className="block">{additionalS.title} :</b>
              <i className="text-sm">
                {additionalS.minPerAddition && (
                  <p>Mínimo de: {additionalS.minPerAddition}</p>
                )}
                {additionalS.maxPerAddition && (
                  <p>Máximo de: {additionalS.maxPerAddition}</p>
                )}
              </i>
              <hr className="mt-4" />
              <AditionalSectionComponent
                additionals={additionalS.additionalProducts!}
                maxAdditional={additionalS.maxPerAddition!}
                setControl={(products: Additional[]) =>
                  setControl(products, additionalS)
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
