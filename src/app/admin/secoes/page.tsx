import { currentUser } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { ListSection } from "~/components/sections/list";

export default async function SecoesPage() {
    const user = await currentUser()
    if (!user) {
        redirect("/")
    }
    const orgId = user!.publicMetadata!.orgId
    const sections = await api.section.getSection({ orgId: Number(orgId) })

    return (
        <main className="container mx-auto p-6 h-[100vh] overflow-auto">
            <ListSection sections={sections.map((section) => ({ ...section }))} orgId={Number(orgId)} />
        </main>
    );
}