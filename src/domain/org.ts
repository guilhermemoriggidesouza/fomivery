export type OrgType = {
  id: number;
  name: string;
  tenant: string;
  telephone: string;
  bgColor: string;
  fontColor: string;
  salesman: string;
  payDay: Date;
  bgColorScreen?: string;
  bgImage?: string;
  icon?: string;
  address?: string;
  deliveryTax?: number;
  taxPerKm?: number;
};

export default class Org {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly tenant: string,
    public readonly telephone: string,
    public readonly bgColor: string,
    public readonly fontColor: string,
    public readonly salesman: string,
    public readonly payDay: Date,
    public readonly bgColorScreen?: string,
    public readonly bgImage?: string,
    public readonly icon?: string,
    public readonly address?: string,
    public readonly deliveryTax?: number,
    public readonly taxPerKm?: number,
  ) {}

  calculateTax(distance: number): number {
    if (distance <= this.taxPerKm!) {
      return this.deliveryTax!;
    } else {
      return Math.round((distance / this.taxPerKm!) * this.deliveryTax!);
    }
  }
}
