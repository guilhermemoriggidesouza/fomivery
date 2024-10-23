import { eq } from "drizzle-orm";
import OrgRepository from "~/application/repositories/org";
import Org from "~/domain/org";
import { db } from "~/server/db";
import { orgTable } from "~/server/db/schema";

export default class OrgRepositoryImp implements OrgRepository {
    async findByTenant(tenant: string): Promise<Org | null> {
        const [org] = await db.select()
            .from(orgTable)
            .where(eq(orgTable.tenant, tenant))
            .limit(1)
        if (!org) {
            return null
        }
        return new Org(
            org.id,
            org.name,
            org.tenant,
            org.telephone,
            org.bg_color,
            org.font_color,
            org.bg_image,
            org.salesman,
            org.pay_day
        )
    }
}