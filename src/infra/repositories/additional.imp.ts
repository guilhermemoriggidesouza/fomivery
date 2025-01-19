import { eq, inArray } from "drizzle-orm";
import AdditionalRepository from "~/application/repositories/additional";
import { Additional } from "~/domain/additional";
import { AdditionalSection } from "~/domain/additionalSection";
import Product, { BoughtProduct } from "~/domain/product";
import { db } from "~/infra/db";
import {
  additionalSectionTable,
  productAdditionalTable,
  productTable,
} from "~/server/db/schema";

export default class AdditionalRepositoryImp implements AdditionalRepository {
  async findAdditionalsById(
    additionals: {
      id: number;
      ownerId: number;
      hash: string;
    }[],
  ): Promise<Additional[]> {
    return await Promise.all(
      additionals.map(async (additional) => {
        const [additionalFromDb] = await db
          .select()
          .from(productTable)
          .where(eq(productTable.id, additional.id));

        const [producOwnerDb] = await db
          .select()
          .from(productTable)
          .where(eq(productTable.id, additional.ownerId));

        const productDomain = new Product(
          additionalFromDb!.id,
          additionalFromDb!.title,
          additionalFromDb!.org_id,
          additionalFromDb!.obrigatory_additional ?? false,
          additionalFromDb!.value ?? undefined,
          additionalFromDb!.section_id ?? undefined,
          additionalFromDb!.additional_section_id ?? undefined,
          additionalFromDb!.description ?? undefined,
          additionalFromDb!.image ?? undefined,
        );

        return new Additional(
          { hash: additional!.hash!, id: producOwnerDb!.id },
          productDomain,
        );
      }),
    );
  }

  async findAdditionalByProductById(productId: number): Promise<Additional[]> {
    const [productOwner] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, productId));
    const additionalProductsIds = await db
      .select()
      .from(productAdditionalTable)
      .where(eq(productAdditionalTable.id_product_owner, productId));
    const additionalProducts = await db
      .select({
        section: additionalSectionTable,
        product: productTable,
      })
      .from(productTable)
      .leftJoin(
        additionalSectionTable,
        eq(additionalSectionTable.id, productTable.additional_section_id),
      )
      .where(
        inArray(
          productTable.id,
          additionalProductsIds.map((adp) => adp.id_product_additional!),
        ),
      );
    const additionalDomain = additionalProducts.map((adp) => {
      const AdditionalSectionDomain = new AdditionalSection(
        adp.section!.id,
        adp.section!.title,
        adp.section?.max_per_additional ?? undefined,
        adp.section?.min_per_additional ?? undefined,
      );
      const productDomain = new Product(
        adp.product.id,
        adp.product.title,
        adp.product.org_id,
        adp.product.obrigatory_additional ?? false,
        adp.product.value ?? undefined,
        adp.product.section_id ?? undefined,
        adp.product.additional_section_id ?? undefined,
        adp.product.description ?? undefined,
        adp.product.image ?? undefined,
        undefined,
      );
      return new Additional(
        { id: productOwner!.id },
        productDomain,
        AdditionalSectionDomain,
      );
    });
    return additionalDomain;
  }
}
