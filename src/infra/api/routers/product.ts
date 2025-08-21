import { z } from "zod";
import { createTRPCRouter, publicRoute } from "../trpc";
import ProductRepositoryImp from "~/infra/repositories/product.imp";
import CreatProductUseCase from "~/application/usecases/createProduct";
import GetOnlyProducts from "~/application/usecases/getOnlyProducts";
import { TRPCError } from "@trpc/server";
import DeleteProductUseCase from "~/application/usecases/deleteProduct";

export const productRouter = createTRPCRouter({
  create: publicRoute
    .input(
      z.object({
        title: z.string(),
        orgId: z.number(),
        obrigatoryAdditional: z.boolean(),
        value: z.number(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const productRepository = new ProductRepositoryImp();
        const createSugestionUseCase = new CreatProductUseCase(
          productRepository,
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