"use client"
import { useState } from "react";
import Products from "./products";
import { SectionItem } from "./section";
import Sections from "./sections";
import FloatingButton from "./floatingButton";
import { Button } from "./ui/button";
import { SugestionModal } from "./sugestion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SugestedBadge from "./sugestedBadget";
import { api } from "~/trpc/react";
import Product from "~/domain/product";
import { CartModal } from "./cart";
import ThemeProvider from "~/context/themeProvider";
import Loading from "./ui/loading";
import Order from "~/domain/order";
import { useRouter } from "next/navigation";

export type MenuProp = {
    sections: SectionItem[],
    products: Product[],
    bgColor: string,
    fontColor: string,
    orgId: number,
    tenant: string
}

export default function Menu({ sections, products, bgColor, fontColor, orgId, tenant }: MenuProp) {
    const router = useRouter()
    const [sectionList, setSectionList] = useState(sections)
    const [section, setSection] = useState<SectionItem>(sections[0]!)
    const [openSugestion, setOpenSugestion] = useState(false);
    const [qtdItems, setQtdItens] = useState(0);
    const [openCart, setOpenCart] = useState(false);
    const [sugested, setSugested] = useState<boolean>(false);
    const [sugestionValue, setSugestionValue] = useState<number | undefined>();
    const [boughtProducts, setBoughtProducts] = useState<Product[]>([])
    const { data: dataGetProducts, refetch: refetchGetProducts } = api.menu.getProducts.useQuery({
        sectionId: section!.id, orgId
    }, {
        initialData: products,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    })
    const { data: dataSugested, mutate } = api.menu.createSugestion.useMutation()

    const generateOrder = (data: Order) => {
        router.push(`/${tenant}/finish/${data.hash}`)
    }
    const { isPending, mutate: mutateOrder } = api.menu.createOrder.useMutation({ onSuccess: generateOrder })
    const changeSection = (id: number) => {
        const newArray = sectionList.map(section => {
            if (section.id == id) {
                section.selected = true
                if (sugested && sugestionValue) {
                    mutate({ sugestionValue, sectionId: section.id, orgId })
                }
                setSection(section)
            } else {
                section.selected = false
            }
            return section
        })
        setSectionList(newArray)
    }

    const handleOpenCartModal = () => {
        setOpenCart(true)
    }

    const handleOpenSugestionModal = () => {
        setOpenSugestion(!openSugestion)
    }

    const getProductSugestions = async () => {
        if (!sugestionValue) {
            alert("insira um valor")
        }
        if (!sugestionValue) {
            return
        }
        mutate({ sugestionValue, sectionId: section.id, orgId })
        setSugested(true)
        setOpenSugestion(false)
    }

    const handlerCleanSugestion = () => {
        setSugested(false)
        setSugestionValue(undefined)
        refetchGetProducts()
    }

    const handlerAddProduct = (product: Product) => {
        let newArray = [...boughtProducts]
        let hasProduct = false
        newArray = newArray.map(item => {
            if (item.id == product.id) {
                item.quantity += 1
                hasProduct = true
            }
            return item
        })
        if (!hasProduct) {
            product.quantity += 1
            newArray.push(product)
        }
        setQtdItens((value) => value + 1)
        setBoughtProducts(newArray)
    }

    const handlerRemoveProduct = (product: Product) => {
        let newArray: (Product | null)[] = [...boughtProducts]
        const newArrayProducts: Product[] = newArray.map(item => {
            if (item && item.id == product.id && item.quantity > 0) {
                item.quantity -= 1
                setQtdItens((value) => value - 1)
            }
            if (!item || item.quantity == 0) {
                return null
            }
            return item
        }).filter(e => e != null)
        setBoughtProducts(newArrayProducts)
    }

    return (
        <ThemeProvider bgColor={bgColor} fontColor={fontColor}>
            <Sections sections={sectionList} changeSection={changeSection} />
            <div style={{ margin: "auto", maxWidth: "600px" }}>
                {(sugested && dataSugested && dataSugested.products) ?
                    <>
                        <SugestedBadge sugested={sugested} onClose={handlerCleanSugestion} length={dataSugested!.products.length} value={dataSugested.totalSugested} />
                        <Products products={dataSugested.products} onAddProduct={handlerAddProduct} />
                    </>
                    :
                    <Products products={dataGetProducts} onAddProduct={handlerAddProduct} />
                }
            </div>

            <FloatingButton bottomPosition="bottom-20" >
                <>
                    {boughtProducts.length > 0 && <div style={{ marginLeft: "-10px", marginBottom: "-20px", zIndex: "10" }} className="relative bg-red-500 text-white rouded rounded-full h-8 w-8 flex justify-center align-center items-center"><span className="m-auto">{qtdItems}</span></div>}
                    <button onClick={handleOpenCartModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg" >
                        <p>Carrinho</p>
                    </button>
                </>
            </FloatingButton >

            <FloatingButton bottomPosition="bottom-6" >
                <button onClick={handleOpenSugestionModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg" >
                    <p>Sugestão $$</p>
                </button>
            </FloatingButton >

            <SugestionModal
                open={openSugestion}
                onOpenChange={setOpenSugestion}
                description="Insira um valor que iremos te sugerir opções aproximadas desse valor"
                title="Até quanto você pretende gastar?"
                saveButton={<>
                    <Button variant="outline" onClick={(e) => getProductSugestions()}>
                        Filtrar produtos
                    </Button>
                </>}
            >
                <>
                    <Label htmlFor="sugestionValue" className="text-left">
                        Valor em Reais:
                    </Label>
                    <Input
                        type="number"
                        placeholder="20"
                        onChange={(e) => setSugestionValue(Number(e.target.value))}
                        id="sugestionValue"
                    />
                </>
            </SugestionModal>
            <CartModal
                open={openCart}
                onOpenChange={(value) => {
                    if (!isPending)
                        setOpenCart(value)
                }}
                description="Assim que confirmar, basta fechar o pedido"
                title="Aqui está seus itens"
                saveButton={<>
                    {!isPending ?
                        <Button variant="outline" onClick={(e) =>
                            mutateOrder({ products: boughtProducts.map(b => ({ id: b.id, qtd: b.quantity })), orgId, name: "Adelaide" })
                        }>
                            Fechar pedido
                        </Button> : <div className="w-100 flex justify-center"><Loading /></div>
                    }
                    {boughtProducts.length > 0 && <p className="my-2">Total: R$ {boughtProducts.map(b => (b.value * b.quantity)).reduce((previous, current) => previous + current).toFixed(2).replace(".", ",")}</p>}
                </>}
            >
                <>
                    {boughtProducts.map((item, i) => <p className="my-4 truncate ">
                        <span className="cursor-pointer font-lg p-4" onClick={() => handlerRemoveProduct(item)}>-</span>
                        {item.quantity}
                        <span className="cursor-pointer font-lg p-4" onClick={() => handlerAddProduct(item)}>+</span>
                        [R$ {(item.value).toFixed(2).replace(".", ",")}]
                        {"  "}
                        {item.title}
                        {"  "}
                    </p>)}
                </>
            </CartModal>
        </ThemeProvider>
    )

}