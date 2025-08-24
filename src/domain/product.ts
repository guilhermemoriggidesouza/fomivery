import { v4 } from "uuid";
import { Additional, AdditionalType } from "./additional";
import Section from "./section";
import Category from "./category";
export type ProductType = {
  id: number;
  title: string;
  orgId: number;
  boolean?: boolean;
  value?: number;
  sectionId?: number;
  description?: string;
  image?: string;
  hasAdditional?: boolean;
  additional?: Additional[];
};
export default class Product {
  constructor(
    public id: number,
    public readonly title: string,
    public readonly orgId: number,
    public readonly obrigatoryAdditional: boolean = false,
    public value?: number,
    public readonly sectionId?: number,
    public readonly description?: string,
    public readonly image?: string,
    public readonly hasAdditional?: boolean,
    public additional?: Additional[],
    public sections?: Section[],
    public categories?: Category[]
  ) { }
}

export type BoughtProductType = {
  id: number;
  title: string;
  orgId: number;
  obrigatoryAdditional: boolean;
  value?: number;
  sectionId?: number;
  description?: string;
  image?: string;
  hasAdditional?: boolean;
  additional?: AdditionalType[];
  price?: number;
  hash?: string;
  quantity: number;
};

export class BoughtProduct extends Product {
  price?: number = 0;
  hash?: string;
  quantity: number = 0;
  idsAccumulator: string;

  constructor(product: Product) {
    super(
      product.id,
      product.title,
      product.orgId,
      product.obrigatoryAdditional,
      product.value,
      product.sectionId,
      product.description,
      product.image,
      product.hasAdditional,
      product.additional,
    );
    this.idsAccumulator = `${this.id.toString()}${this.additional?.map((adt) => adt.product.id).join("")}`;
    this.hash = v4();
    if (product.additional && product.additional.length > 0) {
      const valuesAditional = product.additional
        ?.map((p) => p.product.value ?? 0)
        .filter((e) => e != undefined);
      this.price =
        (product.value ?? 0) +
        valuesAditional?.reduce((acc, next) => acc + next, 0);
    } else {
      this.price = product.value ?? 0;
    }
  }

  reCalculate() {
    this.idsAccumulator = `${this.id.toString()}${this.additional?.map((adt) => adt.product.id).join("")}`;
    const valuesAditional = this.additional?.map((p) => p.product.value ?? 0);
    this.price =
      (this.value ?? 0) +
      ((valuesAditional &&
        valuesAditional?.reduce((acc, next) => acc + next)) ??
        0);
  }

  static create(
    productFromDb: {
      value: number | null;
      id: number;
      title: string;
      description: string | null;
      image: string | null;
      section_id: number | null;
      org_id: number;
      obrigatory_additional: boolean | null;
    },
    hash?: string,
  ) {
    const product = new Product(
      productFromDb.id ?? undefined,
      productFromDb.title,
      productFromDb.org_id,
      productFromDb.obrigatory_additional ?? undefined,
      productFromDb.value ?? undefined,
      productFromDb.section_id ?? undefined,
      productFromDb.description ?? undefined,
      productFromDb.image ?? undefined,
    );
    const boughtProduct = new BoughtProduct(product);
    if (hash) {
      boughtProduct.hash = hash;
    }
    return boughtProduct;
  }
}
