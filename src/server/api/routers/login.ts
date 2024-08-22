import { z } from "zod";
import LoginUseCase from "~/application/usecases/login";

import { createTRPCRouter, publicRoute } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  login: publicRoute
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const loginUseCase = new LoginUseCase()
        const userSession = await loginUseCase.execute(input)
        ctx.session = userSession
      } catch (err: any) {
        return { error: err.message }
      }
    }),
});
