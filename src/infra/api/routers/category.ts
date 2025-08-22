import { z } from "zod";
import { createTRPCRouter, publicRoute } from "../trpc";
import CategoryRepositoryImp from "~/infra/repositories/category.imp";
import CreatCategoryUseCase from "~/application/usecases/createCategory";
import GetCategoriesUseCase from "~/application/usecases/getCategories";
import { TRPCError } from "@trpc/server";
import DeleteCategoryUseCase from "~/application/usecases/deleteCategory";

export const categoryRouter = createTRPCRouter({
  create: publicRoute
    .input(
      z.object({
        title: z.string(),
        orgId: z.number(),
        color: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const categoryRepository = new CategoryRepositoryImp();
        const createSugestionUseCase = new CreatCategoryUseCase(
          categoryRepository,
        );
        const category = await createSugestionUseCase.execute(input);
        return category;
      } catch (error) {
        console.error(error)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category não foi salvo.",
        });
      }
    }),

  getByOrgId: publicRoute.input(z.number()).query(async ({ ctx, input }) => {
    const categoryRepository = new CategoryRepositoryImp();
    const getOnlyCategoriesUseCase = new GetCategoriesUseCase(
      categoryRepository,
    );
    const category = await getOnlyCategoriesUseCase.execute(input);
    return category;
  }),

  delete: publicRoute.input(z.number()).mutation(async ({ ctx, input }) => {
    const categoryRepository = new CategoryRepositoryImp();
    const deleteCategorysUseCase = new DeleteCategoryUseCase(
      categoryRepository,
    );
    await deleteCategorysUseCase.execute(input);
    return input;
  })
})