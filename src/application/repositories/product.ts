import Product from "~/domain/product";

export default interface ProductRepository {
  findBySectionAndOrg: (sectionId: number, orgId: number) => Promise<Product[]>;
  findByIds: (products: number[]) => Promise<Product[]>;
}
