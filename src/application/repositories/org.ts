import Org from "~/domain/org";

export default interface OrgRepository {
  findByTenant: (tenant: string) => Promise<Org | undefined>;
  findById: (id: number) => Promise<Org | undefined>;
}
