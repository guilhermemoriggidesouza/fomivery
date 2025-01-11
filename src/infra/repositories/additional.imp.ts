import { and, eq, inArray } from "drizzle-orm";
import AdditionalRepository from "~/application/repositories/additional";
import { AdditionalSection } from "~/domain/additionalSection";
import Product from "~/domain/product";
import { db } from "~/server/db";
import { productTable } from "~/server/db/schema";

export default class AdditionalRepositoryImp implements AdditionalRepository {
  async findAdditionalByProductById(
    productId: number,
  ): Promise<AdditionalSection[]> {
    db.select();
  }
}
