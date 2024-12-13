import Org from "~/domain/org"

export default interface OrgRepository {
    findByTenant: (tenant: string) => Promise<Org | null>
    findById: (id: number) => Promise<Org | null>
}