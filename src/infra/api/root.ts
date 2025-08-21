import { menuRouter } from "~/infra/api/routers/menu";
import { orgRouter } from "~/infra/api/routers/org";
import { createCallerFactory, createTRPCRouter } from "~/infra/api/trpc";
import { sectionRouter } from "./routers/section";
import { orderRouter } from "./routers/order";
import { productRouter } from "./routers/product";

export const appRouter = createTRPCRouter({
  menu: menuRouter,
  org: orgRouter,
  section: sectionRouter,
  order: orderRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
