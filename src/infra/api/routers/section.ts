import { z } from "zod";
import GetSection from "~/application/usecases/getSections";
import SectionRepositoryImp from "~/infra/repositories/section.imp";

import { createTRPCRouter, publicRoute } from "~/infra/api/trpc";
import DeleteSectionUseCase from "~/application/usecases/deleteSection";
import { TRPCError } from "@trpc/server";
import CreatSectionUseCase from "~/application/usecases/createSection";

export const sectionRouter = createTRPCRouter({
  getSection: publicRoute
    .input(z.object({ orgId: z.number() }))
    .query(async ({ ctx, input }) => {
      const sectionRepository = new SectionRepositoryImp();
      const getSection = new GetSection(sectionRepository);
      const section = await getSection.execute(input);
      return section;
    }),
  create: publicRoute
    .input(
      z.object({
        title: z.string(),
        orgId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const sectionRepository = new SectionRepositoryImp();
        const createSugestionUseCase = new CreatSectionUseCase(
          sectionRepository,
        );
        const section = await createSugestionUseCase.execute(input);
        return section;
      } catch (error) {
        console.error(error)
        throw new TRPCError({
          code: "BAD_REQUEST", // ou UNAUTHORIZED, NOT_FOUND, etc.
          message: "Produto não foi salvo.",
        });
      }
    }),
  delete: publicRoute.input(z.number()).mutation(async ({ ctx, input }) => {
    const sectionRepository = new SectionRepositoryImp();
    const deleteSectionUseCase = new DeleteSectionUseCase(
      sectionRepository,
    );
    await deleteSectionUseCase.execute(input);
    return input;
  })
});
