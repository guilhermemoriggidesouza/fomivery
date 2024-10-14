"use client"
import { useCallback, useEffect, useState } from "react";
import Product, { ProductItem } from "./product";
import Products from "./products";
import { SectionItem } from "./section";
import Sections from "./sections";
import FloatingButton from "./floatingButton";
import { Button } from "./ui/button";
import { SugestionModal } from "./sugestion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SugestedBadge from "./sugestedBadget";

export type MenuProp = {
    sections: SectionItem[],
    products: ProductItem[],
    bgColor: string
}
export default function Menu({ sections, products, bgColor }: MenuProp) {
    const [sectionList, setSectionList] = useState(sections)
    const [section, setSection] = useState<SectionItem | undefined>()
    const [productState, setProductState] = useState<ProductItem[]>(products)
    const [openSugestion, setOpenSugestion] = useState(false);
    const [sugested, setSugested] = useState<boolean>(false);
    const [sugestionValue, setSugestionValue] = useState<number | undefined>();
    const [totalValueSugested, setTotalValueSugested] = useState<number | undefined>();
    const [sugestionAmmount, setSugestionAmmount] = useState<number | undefined>();

    useEffect(() => {
        if (!section) {
            sections[0]!.selected = true
            setSection(sections[0])
            return
        }
    }, [])

    const changeSection = (id: number) => {
        const newArray = sectionList.map(section => {
            if (section.id == id) {
                section.selected = true
                const productsBySesion = products.filter((product: ProductItem) => product.sectionId == section!.id)
                setProductState(productsBySesion)
                setSection(section)
                setSugested(false)
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

    const recursionItem = (listOfProducts: ProductItem[], totalValue: number, sugestionValue: number, sugestedAmmount: number, visualized: Set<number>) => {
        const unvisualizedList = listOfProducts.filter(product => !visualized.has(product.id))
        const randomElement: ProductItem | undefined = unvisualizedList[Math.floor(Math.random() * unvisualizedList.length)];
        let newItem = { ...randomElement } as ProductItem
        const highestValue = sugestionValue * 1.1
        const acummulatedValue = Number(newItem!.value) + totalValue
        if ((acummulatedValue > highestValue)) {
            return recursionItem(listOfProducts, totalValue, sugestionValue, sugestedAmmount, visualized)
        }

        return newItem
    }

    const grantAmmountProducts = (
        sugestionAmmount: number,
        sugestionValue: number,
        listOfProducts: ProductItem[],
        idsUsed: number[] = []
    ): { newArray: ProductItem[], totalValue: number } => {
        let totalValue: number = 0
        const newArray: ProductItem[] = []
        for (let index = 0; index < sugestionAmmount; index++) {
            if ((index >= listOfProducts.length) || (totalValue > sugestionValue!)) {
                return { newArray, totalValue }
            }
            const visualized = new Set(idsUsed)
            console.log("index", index)
            const newItem = recursionItem(listOfProducts, totalValue, sugestionValue, sugestionAmmount, visualized)
            newArray.push(newItem)
            idsUsed.push(newItem.id)
            totalValue += Number(newItem.value)
        }
        return { newArray, totalValue }
    }

    const generateListInRange = (
        sugestionAmmount: number,
        sugestionValue: number,
        listOfProducts: ProductItem[]
    ) => {
        const highestValue = ((sugestionValue! * 1.1) / sugestionAmmount!)
        const lessValue = ((sugestionValue! * 0.9) / sugestionAmmount!)
        console.log({ highestValue, lessValue })
        const listOfProductsInRange = listOfProducts.filter(product => Number(product.value) < highestValue && Number(product.value) > lessValue)
        return listOfProductsInRange
    }

    const fallbackSugestion = (sugestionAmmount: number,
        sugestionValue: number,
        listOfProducts: ProductItem[],
        newArray: ProductItem[],
        totalValue: number
    ) => {
        console.log("call Fallback")
        const newSugestionAmmout = sugestionAmmount - newArray.length
        const newSugestedValue = sugestionValue - totalValue
        const idsUsed = newArray.map(item => item.id)
        const productsNotRechead = listOfProducts.filter(product => !idsUsed.includes(product.id) && (Number(product.value) < sugestionValue!))
        const { newArray: newLesserArray, totalValue: totalLesserSugested } = grantAmmountProducts(
            newSugestionAmmout!,
            newSugestedValue!,
            productsNotRechead,
            idsUsed
        )

        return { newLesserArray, totalLesserSugested }
    }

    const getProductSugestions = () => {
        if (!sugestionValue) {
            alert("insira um valor")
        }
        if (!sugestionAmmount) {
            alert("insira uma quantidade")
        }

        if (!sugestionAmmount || !sugestionValue) {
            return
        }

        const listOfProductsInRange = generateListInRange(sugestionAmmount!, sugestionValue!, products)
        let { newArray, totalValue } = grantAmmountProducts(
            sugestionAmmount!,
            sugestionValue!,
            listOfProductsInRange,
        )
        if (newArray.length < sugestionAmmount! && totalValue < sugestionValue!) {
            const { newLesserArray, totalLesserSugested } = fallbackSugestion(sugestionAmmount!, sugestionValue!, products, newArray, totalValue)
            newArray = newArray.concat(newLesserArray)
            totalValue += totalLesserSugested
        }
        setProductState(newArray)
        setTotalValueSugested(totalValue)
        setSugested(true)
        // setOpenSugestion(false)
    }

    const handlerCleanSugestion = () => {
        setSugested(false)
        setProductState(products)
    }

    return (
        <>
            <Sections sections={sectionList} bgColor={bgColor} changeSection={changeSection} />
            <div style={{ margin: "auto", maxWidth: "600px" }}>
                <SugestedBadge sugested={sugested} onClose={handlerCleanSugestion} bgColor={bgColor} length={productState.length} value={totalValueSugested!} />
                <Products products={productState} bgColor={bgColor} />
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
                description="Insira um valor e quantidade de produtos que iremos te sugerir opções aproximadas esse valor"
                title="Sugestion"
                saveButton={<>
                    <Button variant="outline" onClick={(e) => getProductSugestions()}>
                        Filtrar produtos
                    </Button>
                </>}
            >
                <>
                    <Label htmlFor="sugestionValue" className="text-left">
                        Quantidade de produtos:
                    </Label>
                    <Input
                        type="number"
                        placeholder="5"
                        onChange={(e) => setSugestionAmmount(Number(e.target.value))}
                        id="sugestionValue"
                    />
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