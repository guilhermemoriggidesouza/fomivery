import { Additional } from "./additional";

export default class Product {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly value: number,
    public readonly orgId: number,
    public readonly obrigatoryAdditional: boolean = false,
    public readonly sectionId?: number | null,
    public readonly description?: string | null,
    public readonly image?: string | null,
    public quantity: number = 0,
    public readonly hasAdditional: boolean = false,
    public readonly additional?: Additional[],
  ) {}
}
