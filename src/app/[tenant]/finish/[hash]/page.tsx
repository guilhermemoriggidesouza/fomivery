import { api } from "~/trpc/server";
import NotFound from "~/components/notFound";
import OrderFinish from "~/components/orderFinish";
import Product from "~/domain/product";
import { OrderType } from "~/domain/order";

export default async function Finish({ params }: { params: { tenant: string, hash: string } }) {
    const dataOrg = await api.org.getOrg({ tenant: params.tenant })
    if (!dataOrg) {
        return <NotFound />
    }
    const dataOrder = await api.order.getOrder({ hash: params.hash })
    dataOrder.products = dataOrder.products.map((p: Product) => ({ ...p }))
    const order = { ...dataOrder } as OrderType
    const org = { ...dataOrg }
    return (
        <main style={{
            color: dataOrg.fontColor,
            overflow: "hidden"
        }}>
            <div style={{
                height: "100dvh",
                width: "100vw",
                opacity: 0.8,
                backgroundImage: org.bgImage != null ? `url(${org.bgImage})`: undefined,
                backgroundColor: org.bgColorScreen || undefined, 
                backgroundRepeat: "repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "contain",
            }} />
            <div className="absolute top-0 overflow-auto h-screen m-auto w-screen">
                <OrderFinish bgColor={dataOrg.bgColor} fontColor={dataOrg.fontColor} orderFirst={order} org={org} />
            </div>
        </main>
    );
}
