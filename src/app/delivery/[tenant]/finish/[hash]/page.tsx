import { api } from "~/trpc/server";
import NotFound from "~/components/notFound";
import OrderFinish from "~/components/orderFinish";
import { BoughtProductType } from "~/domain/product";
import { OrderType } from "~/domain/order";
import { OrgType } from "~/domain/org";
import HeaderOrg from "~/components/headerOrg";
import { headers } from "next/headers";

export default async function Finish({
  params,
}: {
  params: { tenant: string; hash: string };
}) {
  const dataOrg = await api.org.getOrg({ tenant: params.tenant });
  if (!dataOrg) {
    return <NotFound />;
  }
  const base = `${headers().get("x-forwarded-proto")}://${headers().get("host")}`;
  const dataOrder = await api.order.getOrder({ hash: params.hash });
  const order = JSON.parse(JSON.stringify(dataOrder)) as OrderType;
  const org = { ...dataOrg } as OrgType;
  return (
    <main
      style={{
        color: dataOrg.fontColor,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100dvh",
          width: "100vw",
          opacity: 0.8,
          backgroundImage:
            org.bgImage != null ? `url(${org.bgImage})` : undefined,
          backgroundColor: org.bgColorScreen || undefined,
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      />
      <div className="absolute top-0 m-auto h-screen w-screen overflow-auto">
        <HeaderOrg org={dataOrg} url={base} />
        <OrderFinish
          bgColor={dataOrg.bgColor}
          fontColor={dataOrg.fontColor}
          orderFirst={order}
          org={org}
        />
      </div>
    </main>
  );
}
