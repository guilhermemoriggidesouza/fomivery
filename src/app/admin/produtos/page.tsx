import { currentUser } from "@clerk/nextjs/server";
import { ListProducts } from "~/components/produtos/list";
import Product from "~/domain/product";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function ProductsPage() {
    const user = await currentUser()
    if (!user) {
        redirect("/")
    }
    const orgId = user!.publicMetadata!.orgId
    const products = await api.product.getByOrgId(Number(orgId))
    const sections = await api.section.getSection({ orgId: Number(orgId) })

    return (
        <main className="container mx-auto p-6 h-[100vh] overflow-auto">
            <ListProducts 
                sections={sections.map((section) => ({ ...section, products: section.products?.map(product => ({ ...product })) }))} 
                products={products.map((product) => ({ ...product, sections: product.sections?.map(section => ({ ...section })) }))} 
                orgId={Number(orgId)} 
            />
        </main>
    );
}