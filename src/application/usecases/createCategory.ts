import Category from "~/domain/category";
import CategoryRepository from "../repositories/category";

export type inputDTO = {
    title: string,
    color: string,
    orgId: number,
};

export default class CreateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(input: inputDTO): Promise<Category> {
        const category = new Category(
            0,
            input.title,
            input.color,
            input.orgId,
        );
        await this.categoryRepository.create(category)
        return category;
    }
}
