
import { api } from "~/trpc/server";
import Menu from "~/components/menu";
import Section from "~/domain/section";
import NotFound from "~/components/notFound";
import HeaderOrg from "~/components/headerOrg";
import { headers } from "next/headers";

export default async function Home({ params }: { params: { tenant: string } }) {
  const dataOrg = await api.org.getOrg({ tenant: params.tenant })
  const base = `${headers().get('x-forwarded-proto')}://${headers().get('host')}`;

  if (!dataOrg) {
    return <NotFound />
  }
  const dataSection = await api.section.getSection({ orgId: dataOrg.id })
  const dataProducts = await api.menu.getProducts({ sectionId: dataSection[0]!.id, orgId: dataOrg.id })
  const sections = dataSection.map((section: Section, i: number) => ({
    ...section,
    selected: i == 0 ? true : false
  }))
  const products = dataProducts.map(product => ({ ...product }))

  return (
    <main style={{
      color: dataOrg.fontColor,
      overflow: "hidden"
    }}>
      <div style={{
        height: "100vh",
        width: "100vw",
        opacity: 0.8,
        backgroundImage: "url(fundo-cardapio.jpg)",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }} />
      <div className="absolute top-0 overflow-auto h-screen m-auto w-screen">
        <HeaderOrg org={dataOrg} url={base} />
        <Menu orgId={dataOrg.id} products={products} sections={sections} bgColor={dataOrg.bgColor} fontColor={dataOrg.fontColor} tenant={params.tenant} />
      </div>
    </main>
  );
}
