import Org from "~/domain/org";
import OrgRepository from "../repositories/org";

export type inputDTO = {
  tenant: string;
};

export default class GetOrg {
  constructor(private readonly orgRepository: OrgRepository) {}

  async execute(input: inputDTO): Promise<Org> {
    const org = await this.orgRepository.findByTenant(input.tenant);
    if (!org) {
      throw new Error("Org error");
    }
    return org;
  }
}
