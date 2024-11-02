import { z } from "zod";
import FinishOrderUseCase from "~/application/usecases/finishOrder";
import GetOrder from "~/application/usecases/getOrder";
import OrderRepositoryImp from "~/infra/repositories/order.imp";

import { createTRPCRouter, publicRoute } from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
    getOrder: publicRoute
        .input(z.object({ hash: z.string() }))
        .query(async ({ ctx, input }) => {
            const orderRepository = new OrderRepositoryImp();
            const getOrder = new GetOrder(orderRepository)
            const order = await getOrder.execute(input)
            return order
        }),
    finishOrder: publicRoute
        .input(z.object({
            name: z.string(),
            telephone: z.string(),
            email: z.string().optional(),
            hash: z.string(),
            obs: z.string().optional(),
            paymentType: z.string(),
            total: z.number(),
            changePayment: z.number().optional(),
            delivery: z.boolean().default(true)
        }))
        .mutation(async ({ ctx, input }) => {
            const orderRepository = new OrderRepositoryImp();
            const finishOrder = new FinishOrderUseCase(orderRepository)
            const order = await finishOrder.execute(input)
            return order
        }),
});
