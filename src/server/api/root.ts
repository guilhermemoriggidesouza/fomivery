import { menuRouter } from "~/server/api/routers/menu";
import { orgRouter } from "~/server/api/routers/org";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { sectionRouter } from "./routers/section";
import { orderRouter } from "./routers/order";
export const appRouter = createTRPCRouter({
  menu: menuRouter,
  org: orgRouter,
  section: sectionRouter,
  order: orderRouter,
});
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
