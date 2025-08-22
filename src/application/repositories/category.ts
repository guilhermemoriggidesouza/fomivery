import Category from "~/domain/category";

export default interface CategoryRepository {
    findByOrgId: (orgId: number) => Promise<Category[]>;
    create: (category: Category) => Promise<Category>
    delete: (categoryId: number) => Promise<void>
}
