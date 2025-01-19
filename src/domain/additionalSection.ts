import { Additional } from "./additional";

export type AdditionalSectionType = {
  id: number;
  title: String;
  maxPerAddition?: number;
  minPerAddition?: number;
};
export class AdditionalSection {
  constructor(
    public readonly id: number,
    public readonly title: String,
    public readonly maxPerAddition?: number,
    public readonly minPerAddition?: number,
    public additionalProducts?: Additional[],
  ) {}

  static transformAdditional(additionals: Additional[]): AdditionalSection[] {
    const adpSectionMap = new Map();
    additionals.forEach((adpItem) => {
      adpSectionMap.set(adpItem.section!.id, { ...adpItem.section });
    });
    const adps: AdditionalSection[] = Array.from(adpSectionMap.values());
    const adpsTransformed = adps.map((adpsItem) => {
      const aditionalPerSection = additionals!.filter(
        (adpItem) => adpItem.section!.id == adpsItem.id,
      );
      adpsItem.additionalProducts = [...aditionalPerSection];
      return adpsItem;
    });
    return adpsTransformed;
  }
}
