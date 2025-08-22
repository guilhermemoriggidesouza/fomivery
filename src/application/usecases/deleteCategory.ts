import CategoryRepository from "../repositories/category";

export default class DeleteCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(categoryId: number): Promise<void> {
        await this.categoryRepository.delete(categoryId)
    }
}
