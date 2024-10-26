import { z } from "zod";
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
});
