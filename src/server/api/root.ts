import { authRouter } from "~/server/api/routers/login";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
export const appRouter = createTRPCRouter({
  auth: authRouter,
});
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
