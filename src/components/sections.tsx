"use client";
import { ThemeContext } from "~/context/themeProvider";
import Section, { SectionItem } from "./section";
import { useContext, useEffect, useRef, useState } from "react";

export type SectionsProps = {
  sections: SectionItem[];
  changeSection: (id: number) => void;
};
export default function Sections({ sections, changeSection }: SectionsProps) {
  const refli = useRef<HTMLLIElement>(null);
  const reful = useRef<HTMLUListElement>(null);
  const {
    theme: { bgColor, fontColor },
  } = useContext(ThemeContext);

  useEffect(() => {
    if (refli.current && reful.current) {
      let scrollLeft = refli.current.offsetLeft;
      reful.current?.scrollTo({ behavior: "smooth", top: 0, left: scrollLeft });
    }
  }, [refli?.current, sections]);

  return (
    <ul
      id="list-product"
      ref={reful}
      className="relative block flex list-none overflow-y-hidden overflow-x-visible whitespace-nowrap"
      style={{ color: fontColor, backgroundColor: bgColor }}
    >
      {sections.map((section: SectionItem) => (
        <li
          onClick={() => changeSection(section.id)}
          id={`li-${section.id}`}
          ref={section.selected ? refli : null}
          key={section.id}
          className="inline-block transform cursor-pointer transition ease-in-out active:scale-90"
        >
          <Section {...section} />
        </li>
      ))}
    </ul>
  );
}
