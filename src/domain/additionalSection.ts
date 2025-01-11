import { Additional } from "./additional";

export class AdditionalSection {
  constructor(
    public readonly id: number,
    public readonly title: String,
    public readonly additionalProducts: Additional[],
  ) {}
}
