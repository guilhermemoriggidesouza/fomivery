
import { api } from "~/trpc/server";
import Menu from "~/components/menu";
import Section from "~/domain/section";
import NotFound from "~/components/notFound";
import HeaderOrg from "~/components/headerOrg";
import { headers } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <SpeedInsights />
      <div style={{
        height: "100dvh",
        width: "100vw",
        opacity: 0.8,
        backgroundImage: dataOrg.bgImage != null ? `url(${dataOrg.bgImage})` : undefined,
        backgroundColor: dataOrg.bgColorScreen || undefined,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }} />
      <div className="absolute top-0 overflow-auto h-screen m-auto w-screen">
        <HeaderOrg org={dataOrg} url={base} />
        <Menu orgId={dataOrg.id} products={products} sections={sections} bgColor={dataOrg.bgColor} fontColor={dataOrg.fontColor} tenant={params.tenant} />
      </div>
    </main>
  );
}
