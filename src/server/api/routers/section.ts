import { z } from "zod";
import GetSection from "~/application/usecases/getSections";
import SectionRepositoryImp from "~/infra/repositories/section.imp";

import { createTRPCRouter, publicRoute } from "~/server/api/trpc";

export const sectionRouter = createTRPCRouter({
    getSection: publicRoute
        .input(z.object({ orgId: z.number() }))
        .query(async ({ ctx, input }) => {
            const sectionRepository = new SectionRepositoryImp();
            const getSection = new GetSection(sectionRepository)
            const section = await getSection.execute(input)
            return section
        }),
});
