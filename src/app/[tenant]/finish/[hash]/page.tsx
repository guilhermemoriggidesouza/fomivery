import { api } from "~/trpc/server";
import NotFound from "~/components/notFound";
import OrderFinish from "~/components/orderFinish";
import Product from "~/domain/product";

export default async function Finish({ params }: { params: { tenant: string, hash: string } }) {
    const dataOrg = await api.org.getOrg({ tenant: params.tenant })
    if (!dataOrg) {
        return <NotFound />
    }
    const dataOrder = await api.order.getOrder({ hash: params.hash })
    dataOrder.products = dataOrder.products.map((p: Product) => ({ ...p }))
    const order = { ...dataOrder }
    const org = { ...dataOrg }
    return (
        <main style={{
            color: dataOrg.fontColor,
            overflow: "hidden"
        }}>
            <div style={{
                height: "100vh",
                width: "100vw",
                opacity: 0.8,
                backgroundImage: "url(../../fundo-cardapio.jpg)",
                backgroundRepeat: "repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "contain",
            }} />
            <div className="absolute top-0 overflow-auto h-screen m-auto w-screen">
                <OrderFinish bgColor={dataOrg.bgColor} fontColor={dataOrg.fontColor} order={order} org={org} />
            </div>
        </main>
    );
}
