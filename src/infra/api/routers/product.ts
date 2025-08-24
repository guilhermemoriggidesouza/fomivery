import { z } from "zod";
import { createTRPCRouter, publicRoute } from "../trpc";
import ProductRepositoryImp from "~/infra/repositories/product.imp";
import CreatProductUseCase from "~/application/usecases/createProduct";
import GetOnlyProducts from "~/application/usecases/getOnlyProducts";
import { TRPCError } from "@trpc/server";
import DeleteProductUseCase from "~/application/usecases/deleteProduct";
import SectionRepositoryImp from "~/infra/repositories/section.imp";
import CategoryRepositoryImp from "~/infra/repositories/category.imp";
import EditProductUseCase from "~/application/usecases/editProduct";

export const productRouter = createTRPCRouter({
  edit: publicRoute
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        orgId: z.number(),
        obrigatoryAdditional: z.boolean(),
        value: z.number(),
        description: z.string(),
        sections: z.array(z.number()),
        categories: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const productRepository = new ProductRepositoryImp();
        const sectionRepository = new SectionRepositoryImp();
        const categoryRepository = new CategoryRepositoryImp();
        const createSugestionUseCase = new EditProductUseCase(
          productRepository,
          sectionRepository,
          categoryRepository
        );
        const product = await createSugestionUseCase.execute(input);
        return product;
      } catch (error) {
        console.error(error)
        throw new TRPCError({
          code: "BAD_REQUEST", // ou UNAUTHORIZED, NOT_FOUND, etc.
          message: "Produto não foi salvo.",
        });
      }
    }),
  create: publicRoute
    .input(
      z.object({
        title: z.string(),
        orgId: z.number(),
        obrigatoryAdditional: z.boolean(),
        value: z.number(),
        description: z.string(),
        sections: z.array(z.number()),
        categories: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const productRepository = new ProductRepositoryImp();
        const sectionRepository = new SectionRepositoryImp();
        const categoryRepository = new CategoryRepositoryImp();

        const createSugestionUseCase = new CreatProductUseCase(
          productRepository,
          sectionRepository,
          categoryRepository
        );
        const product = await createSugestionUseCase.execute(input);
        return product;
      } catch (error) {
        console.error(error)
        throw new TRPCError({
          code: "BAD_REQUEST", // ou UNAUTHORIZED, NOT_FOUND, etc.
          message: "Produto não foi salvo.",
        });
      }
    }),

  getByOrgId: publicRoute.input(z.number()).query(async ({ ctx, input }) => {
    const productRepository = new ProductRepositoryImp();
    const getOnlyProductsUseCase = new GetOnlyProducts(
      productRepository,
    );
    const product = await getOnlyProductsUseCase.execute(input);
    return product;
  }),
  delete: publicRoute.input(z.number()).mutation(async ({ ctx, input }) => {
    const productRepository = new ProductRepositoryImp();
    const deleteProductsUseCase = new DeleteProductUseCase(
      productRepository,
    );
    await deleteProductsUseCase.execute(input);
    return input;
  })
})