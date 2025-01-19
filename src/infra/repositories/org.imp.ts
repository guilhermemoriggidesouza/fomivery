import { eq } from "drizzle-orm";
import OrgRepository from "~/application/repositories/org";
import Org from "~/domain/org";
import { db } from "~/infra/db";
import { orgTable } from "~/server/db/schema";

export default class OrgRepositoryImp implements OrgRepository {
  async findById(id: number): Promise<Org | undefined> {
    const [org] = await db
      .select()
      .from(orgTable)
      .where(eq(orgTable.id, id))
      .limit(1);
    if (!org) {
      return;
    }
    return new Org(
      org.id,
      org.name,
      org.tenant,
      org.telephone,
      org.bg_color,
      org.font_color,
      org.salesman,
      org.pay_day,
      org.bg_color_screen ?? undefined,
      org.bg_image ?? undefined,
      org.icon ?? undefined,
      org.address ?? undefined,
      org.delivery_tax ?? undefined,
      org.tax_per_km ?? undefined,
    );
  }
  
  async findByTenant(tenant: string): Promise<Org | undefined> {
    const [org] = await db
      .select()
      .from(orgTable)
      .where(eq(orgTable.tenant, tenant))
      .limit(1);
    if (!org) {
      return;
    }
    return new Org(
      org.id,
      org.name,
      org.tenant,
      org.telephone,
      org.bg_color,
      org.font_color,
      org.salesman,
      org.pay_day,
      org.bg_color_screen ?? undefined,
      org.bg_image ?? undefined,
      org.icon ?? undefined,
      org.address ?? undefined,
      org.delivery_tax ?? undefined,
      org.tax_per_km ?? undefined,
    );
  }
}
