import { z } from "zod";
import CreatOrderUseCase from "~/application/usecases/createOrder";
import CreatSugestionUseCase from "~/application/usecases/createSugestion";
import GetAdditional from "~/application/usecases/getAdditional";
import GetProducts from "~/application/usecases/getProducts";
import AdditionalRepositoryImp from "~/infra/repositories/additional.imp";
import OrderRepositoryImp from "~/infra/repositories/order.imp";
import ProductRepositoryImp from "~/infra/repositories/product.imp";

import { createTRPCRouter, publicRoute } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  createSugestion: publicRoute
    .input(
      z.object({
        sugestionValue: z.number(),
        sectionId: z.number(),
        orgId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const productRepository = new ProductRepositoryImp();
      const createSugestionUseCase = new CreatSugestionUseCase(
        productRepository,
      );
      const sugestedMenu = await createSugestionUseCase.execute(input);
      return sugestedMenu;
    }),
  getProducts: publicRoute
    .input(z.object({ sectionId: z.number(), orgId: z.number() }))
    .query(async ({ ctx, input }) => {
      const productRepository = new ProductRepositoryImp();
      const getProducts = new GetProducts(productRepository);
      const products = await getProducts.execute(input);
      return products;
    }),
  getAdditional: publicRoute
    .input(z.object({ productId: z.number() }))
    .query(async ({ ctx, input }) => {
      const AdditionalRepository = new AdditionalRepositoryImp();
      const getProducts = new GetAdditional(AdditionalRepository);
      const products = await getProducts.execute(input);
      return products;
    }),
  createOrder: publicRoute
    .input(
      z.object({
        products: z.array(z.object({ id: z.number(), qtd: z.number() })),
        name: z.string(),
        orgId: z.number(),
        telephone: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const orderRepository = new OrderRepositoryImp();
      const productRepository = new ProductRepositoryImp();

      const createOrder = new CreatOrderUseCase(
        orderRepository,
        productRepository,
      );
      const order = await createOrder.execute(input);
      return order;
    }),
});
