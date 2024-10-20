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

export type MenuProp = {
    sections: SectionItem[],
    products: Product[],
    bgColor: string
}
export default function Menu({ sections, products, bgColor }: MenuProp) {
    const [sectionList, setSectionList] = useState(sections)
    const [section, setSection] = useState<SectionItem>(sections[0]!)
    const [openSugestion, setOpenSugestion] = useState(false);
    const [sugested, setSugested] = useState<boolean>(false);
    const [sugestionValue, setSugestionValue] = useState<number | undefined>();
    const { data: dataGetProducts, refetch: refetchGetProducts } = api.menu.getProducts.useQuery({
        sectionId: section!.id,
    }, {
        initialData: { products },
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    })
    const { data: dataSugested, mutate } = api.menu.createSugestion.useMutation()

    const changeSection = (id: number) => {
        const newArray = sectionList.map(section => {
            if (section.id == id) {
                section.selected = true
                if (sugested && sugestionValue) {
                    mutate({ sugestionValue, sectionId: section.id })
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
        mutate({ sugestionValue, sectionId: section.id })
        setSugested(true)
        setOpenSugestion(false)
    }

    const handlerCleanSugestion = () => {
        setSugested(false)
        setSugestionValue(undefined)
        refetchGetProducts()
    }

    return (
        <>
            <Sections sections={sectionList} bgColor={bgColor} changeSection={changeSection} />
            <div style={{ margin: "auto", maxWidth: "600px" }}>
                {(sugested && dataSugested && dataSugested.products) ?
                    <>
                        <SugestedBadge sugested={sugested} onClose={handlerCleanSugestion} bgColor={bgColor} length={dataSugested!.products.length} value={dataSugested.totalSugested} />
                        <Products products={dataSugested.products} bgColor={bgColor} />
                    </>
                    :
                    <Products products={dataGetProducts.products} bgColor={bgColor} />
                }
            </div>

            <FloatingButton bottomPosition="bottom-20" >
                <button onClick={handleOpenCartModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg" >
                    <p>Carrinho</p>
                </button>
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
                title="Sugestion"
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
        </>
    )

}