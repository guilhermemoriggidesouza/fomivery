import { z } from "zod";
import { createTRPCRouter, publicRoute } from "../trpc";
import ProductRepositoryImp from "~/infra/repositories/product.imp";
import CreatProductUseCase from "~/application/usecases/createProduct";
import GetOnlyProducts from "~/application/usecases/getOnlyProducts";

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
      const productRepository = new ProductRepositoryImp();
      const createSugestionUseCase = new CreatProductUseCase(
        productRepository,
      );
      const product = await createSugestionUseCase.execute(input);
      return product;
    }),

  getByOrgId: publicRoute.input(z.number()).query(async ({ ctx, input }) => {
    const productRepository = new ProductRepositoryImp();
    const getOnlyProductsUseCase = new GetOnlyProducts(
      productRepository,
    );
    const product = await getOnlyProductsUseCase.execute(input);
    return product;
  })
})