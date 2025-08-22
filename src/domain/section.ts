import { Additional } from "./additional";
import Product from "./product";

export default class Section {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly orgId: number,
    public readonly maxPerAddition?: number,
    public readonly minPerAddition?: number,
    public additionalProducts?: Additional[],
    public isAditional: boolean = false,
    public products?: Product[],
  ) { }

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
      adpsItem.isAditional = true
      return adpsItem;
    });
    return adpsTransformed;
  }
}
