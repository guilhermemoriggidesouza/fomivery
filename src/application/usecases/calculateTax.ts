import {
  Client,
  PlaceInputType,
  TravelMode,
} from "@googlemaps/google-maps-services-js";
import OrgRepository from "../repositories/org";

export type inputDTO = {
  clientAddress: string;
  orgAddress: string;
  orgId: number;
};
export type outputDTO = {
  taxValue: number;
};
export default class CalculateTax {
  constructor(
    public readonly googleMaps: Client,
    private readonly orgRepository: OrgRepository,
  ) {}

  async execute(input: inputDTO): Promise<outputDTO> {
    try {
      const { data: dataClientAddress } =
        await this.googleMaps.findPlaceFromText({
          params: {
            input: input.clientAddress,
            inputtype: PlaceInputType.textQuery,
            fields: ["place_id", "name"],
            key: process.env.GOOGLE_MAPS_KEY!,
          },
        });

      const { data: dataOrgAddress } = await this.googleMaps.findPlaceFromText({
        params: {
          input: input.orgAddress,
          inputtype: PlaceInputType.textQuery,
          fields: ["place_id", "name"],
          key: process.env.GOOGLE_MAPS_KEY!,
        },
      });
      if (
        dataClientAddress.candidates.length == 0 ||
        dataOrgAddress.candidates.length == 0
      ) {
        throw new Error("Não foi possivel achar o endereço");
      }
      const { data } = await this.googleMaps.directions({
        params: {
          origin: `place_id:${dataOrgAddress.candidates[0]!.place_id!}`,
          destination: `place_id:${dataClientAddress.candidates[0]!.place_id!}`,
          mode: TravelMode.driving,
          key: process.env.GOOGLE_MAPS_KEY!,
        },
      });

      if (
        !data.routes ||
        data.routes.length == 0 ||
        !data.routes[0]!.legs ||
        data.routes[0]!.legs.length == 0
      ) {
        throw new Error("Não foi possivel achar o endereço");
      }
      const distance: number = data.routes[0]!.legs[0]!.distance.value / 1000;
      console.log(distance);
      const org = await this.orgRepository.findById(input.orgId);
      if (!org) {
        throw new Error("Não foi possível achar a org");
      }
      const taxValue = org.calculateTax(distance);
      return { taxValue };
    } catch (error: any) {
      console.log(error.response.data);
      throw error;
    }
  }
}
