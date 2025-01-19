import { Client } from "@googlemaps/google-maps-services-js";
import { z } from "zod";
import CalculateTax from "~/application/usecases/calculateTax";
import FinishOrderUseCase from "~/application/usecases/finishOrder";
import GetOrder from "~/application/usecases/getOrder";
import OrderRepositoryImp from "~/infra/repositories/order.imp";
import OrgRepositoryImp from "~/infra/repositories/org.imp";

import { createTRPCRouter, publicRoute } from "~/infra/api/trpc";

export const orderRouter = createTRPCRouter({
  getOrder: publicRoute
    .input(z.object({ hash: z.string() }))
    .query(async ({ ctx, input }) => {
      const orderRepository = new OrderRepositoryImp();
      const getOrder = new GetOrder(orderRepository);
      const order = await getOrder.execute(input);
      return order;
    }),
  finishOrder: publicRoute
    .input(
      z.object({
        name: z.string(),
        telephone: z.string(),
        email: z.string().optional(),
        hash: z.string(),
        obs: z.string().optional(),
        paymentType: z.string(),
        total: z.number(),
        changePayment: z.number().optional(),
        delivery: z.boolean(),
        address: z.string().optional(),
        tax: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const orderRepository = new OrderRepositoryImp();
      const finishOrder = new FinishOrderUseCase(orderRepository);
      const order = await finishOrder.execute(input);
      return order;
    }),
  calculateTax: publicRoute
    .input(
      z.object({
        clientAddress: z.string(),
        orgAddress: z.string(),
        orgId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const client = new Client();
      const orgRepository = new OrgRepositoryImp();
      const calculateTax = new CalculateTax(client, orgRepository);
      const tax = await calculateTax.execute(input);
      return tax;
    }),
});
