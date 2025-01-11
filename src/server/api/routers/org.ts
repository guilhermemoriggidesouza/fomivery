import { z } from "zod";
import GetOrg from "~/application/usecases/getOrg";
import OrgRepositoryImp from "~/infra/repositories/org.imp";

import { createTRPCRouter, publicRoute } from "~/server/api/trpc";

export const orgRouter = createTRPCRouter({
  getOrg: publicRoute
    .input(z.object({ tenant: z.string() }))
    .query(async ({ ctx, input }) => {
      const orgRepository = new OrgRepositoryImp();
      const getOrg = new GetOrg(orgRepository);
      const org = await getOrg.execute(input);
      return org;
    }),
});
