import { and, eq } from "drizzle-orm";
import ProductRepository from "~/application/repositories/product";
import Product from "~/domain/product";
import { db } from "~/server/db";
import { productTable } from "~/server/db/schema";

export default class ProductRepositoryImp implements ProductRepository {
    async findBySectionAndOrg(sectionId: number, orgId: number): Promise<Product[]> {
        const products = await db.select()
            .from(productTable)
            .where(and(eq(productTable.section_id, sectionId), eq(productTable.org_id, orgId)))
        return products.map(product =>
            new Product(
                product.id,
                product.description,
                product.title,
                Number(product.value),
                product.image,
                product.section_id,
                product.org_id
            )
        )
    }
}