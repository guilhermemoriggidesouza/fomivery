import { z } from "zod";
import CreatSugestionUseCase from "~/application/usecases/createSugestion";
import GetProducts from "~/application/usecases/getProducts";
import ProductRepositoryImp from "~/infra/repositories/product.imp";

import { createTRPCRouter, publicRoute } from "~/server/api/trpc";
function wait(ms: any, value: any) {
  return new Promise(resolve => setTimeout(resolve, ms, value));
}
export const menuRouter = createTRPCRouter({
  createSugestion: publicRoute
    .input(z.object({ sugestionValue: z.number(), sectionId: z.number(), orgId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const productRepository = new ProductRepositoryImp();
      const createSugestionUseCase = new CreatSugestionUseCase(productRepository)
      const sugestedMenu = await createSugestionUseCase.execute(input)
      return sugestedMenu
    }),
  getProducts: publicRoute
    .input(z.object({ sectionId: z.number(), orgId: z.number() }))
    .query(async ({ ctx, input }) => {
      const productRepository = new ProductRepositoryImp();
      const getProducts = new GetProducts(productRepository)
      const products = await getProducts.execute(input)
      return products
    }),
  createOrder: publicRoute
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      return await wait(10000, "123")
    }),
});
