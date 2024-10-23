import Org from "~/domain/org"

export default interface OrgRepository {
    findByTenant: (tenant: string) => Promise<Org | null>
}