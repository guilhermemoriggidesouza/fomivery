import Category from "~/domain/category";
import CategoryRepository from "../repositories/category";

export default class GetCategory {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(orgId: number): Promise<Category[]> {
    const categories = await this.categoryRepository.findByOrgId(orgId);
    return categories;
  }
}
