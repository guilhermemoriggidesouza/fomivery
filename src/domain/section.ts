import { Additional } from "./additional";

export default class Section {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly orgId: number,
    public readonly maxPerAddition?: number,
    public readonly minPerAddition?: number,
    public additionalProducts?: Additional[],
  ) {}

  static transformAdditional(additionals: Additional[]): Section[] {
    const adpSectionMap = new Map();
    additionals.forEach((adpItem) => {
      adpSectionMap.set(adpItem.section!.id, { ...adpItem.section });
    });
    const adps: Section[] = Array.from(adpSectionMap.values());
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
