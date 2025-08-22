import { currentUser } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { ListCategory } from "~/components/category/list";
import Category from "~/domain/category";

export default async function SecoesPage() {
    const user = await currentUser()
    if (!user) {
        redirect("/")
    }
    const orgId = user!.publicMetadata!.orgId
    const categories = await api.category.getByOrgId(Number(orgId))

    return (
        <main className="container mx-auto p-6 h-[100vh] overflow-auto">
            <ListCategory categories={categories.map((category: Category) => ({ ...category, }))} orgId={Number(orgId)} />
        </main>
    );
}