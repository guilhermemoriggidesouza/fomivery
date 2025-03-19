import { eq, inArray } from "drizzle-orm";
import AdditionalRepository from "~/application/repositories/additional";
import { Additional } from "~/domain/additional";
import Section from "~/domain/section";
import Product, { BoughtProduct } from "~/domain/product";
import { db } from "~/infra/db";
import {
  productAdditionalTable,
  productSectionTable,
  productTable,
  sectionTable,
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
          .leftJoin(
            productSectionTable,
            eq(productSectionTable.id_product, productTable.id),
          )
          .where(eq(productTable.id, additional.id));

        const [producOwnerDb] = await db
          .select()
          .from(productTable)
          .where(eq(productTable.id, additional.ownerId));

        const productDomain = new Product(
          additionalFromDb!.product!.id,
          additionalFromDb!.product!.title,
          additionalFromDb!.product!.org_id,
          additionalFromDb!.product!.obrigatory_additional ?? false,
          additionalFromDb!.product!.value ?? undefined,
          additionalFromDb!.product_section!.id ?? undefined,
          additionalFromDb!.product!.description ?? undefined,
          additionalFromDb!.product!.image ?? undefined,
        );

        return new Additional(
          { hash: additional!.hash!, id: producOwnerDb!.id },
          productDomain,
        );
      }),
    );
  }

  async findAdditionalByProductById(productId: number): Promise<Additional[]> {
    const additionalProducts = await db
      .select({
        section: sectionTable,
        product: productTable,
      })
      .from(productTable)
      .leftJoin(
        productSectionTable,
        eq(productSectionTable.id_product, productTable.id),
      )
      .leftJoin(sectionTable, eq(sectionTable.id, productSectionTable.id_section))
      .leftJoin(
        productAdditionalTable,
        eq(productAdditionalTable.id_product_additional, productTable.id),
      )
      .where(eq(productAdditionalTable.id_product_owner, productId));

    const additionalDomain = additionalProducts.map((adp) => {
      console.log(adp);
      const AdditionalSectionDomain = new Section(
        adp.section!.id,
        adp.section!.title,
        adp.section!.org_id,
        adp.section?.max_per_additional ?? undefined,
        adp.section?.min_per_additional ?? undefined,
      );
      const productDomain = new Product(
        adp.product.id,
        adp.product.title,
        adp.product.org_id,
        adp.product.obrigatory_additional ?? false,
        adp.product.value ?? undefined,
        adp.section!.id ?? undefined,
        adp.product.description ?? undefined,
        adp.product.image ?? undefined,
        undefined,
      );
      return new Additional(
        { id: productId },
        productDomain,
        AdditionalSectionDomain,
      );
    });
    return additionalDomain;
  }
}
