"use client";
import { useEffect, useState } from "react";
import Products from "./products";
import { SectionItem } from "./section";
import Sections from "./sections";
import FloatingButton from "./floatingButton";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import Product, { BoughtProduct } from "~/domain/product";
import { CartModal } from "./modal/cart";
import ThemeProvider from "~/context/themeProvider";
import Loading from "./ui/loading";
import Order from "~/domain/order";
import { useRouter } from "next/navigation";
import { AdditionalModal } from "./modal/aditional";
import { noReLoading } from "~/trpc/query-client";
import { AdditionalList } from "./additionalList";
import { AdditionalSection } from "~/domain/additionalSection";
import { UpIcon } from "./icons/up";
import { DownIcon } from "./icons/down";
import { it } from "node:test";

export type MenuProp = {
  sections: SectionItem[];
  products: Product[];
  bgColor: string;
  fontColor: string;
  orgId: number;
  tenant: string;
};

export default function Menu({
  sections,
  products,
  bgColor,
  fontColor,
  orgId,
  tenant,
}: MenuProp) {
  const router = useRouter();
  const [sectionList, setSectionList] = useState(sections);
  const [section, setSection] = useState<SectionItem>(sections[0]!);
  const [additionalSection, setAdditionalSection] = useState<
    AdditionalSection[]
  >([]);
  const [openSugestion, setOpenSugestion] = useState(false);
  const [qtdItems, setQtdItens] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [productSelected, setProductSelected] = useState<
    BoughtProduct | undefined
  >();
  // const [sugested, setSugested] = useState<boolean>(false);
  // const [sugestionValue, setSugestionValue] = useState<number | undefined>();
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  const {
    isFetching: isPendingProducts,
    data: dataGetProducts,
    refetch: refetchGetProducts,
  } = api.menu.getProducts.useQuery(
    {
      sectionId: section!.id,
      orgId,
    },
    { initialData: products, ...noReLoading },
  );

  const { isFetching: isPendingAdditional, data: dataGetAdditionalSections } =
    api.menu.getAdditional.useQuery(
      {
        productId: productSelected?.id!,
      },
      {
        ...noReLoading,
        enabled: Boolean(productSelected),
      },
    );
  const { data: dataSugested, mutate } = api.menu.createSugestion.useMutation();
  const setProducts = async () => {
    const productsJson = window.sessionStorage.getItem("bougthProducts");
    const productsJsonTotal = window.sessionStorage.getItem(
      "bougthProductsTotal",
    );
    if (productsJson) {
      const bougthProducts = JSON.parse(productsJson);
      setQtdItens(Number(productsJsonTotal));
      setBoughtProducts(bougthProducts);
    }
  };
  useEffect(() => {
    setProducts();
  }, []);

  const generateOrder = (data: Order) => {
    router.push(`/${tenant}/finish/${data.hash}`);
  };
  const {
    isPending,
    isSuccess,
    mutate: mutateOrder,
  } = api.menu.createOrder.useMutation({ onSuccess: generateOrder });

  const changeSection = (id: number) => {
    const newArray = sectionList.map((section) => {
      if (section.id == id) {
        section.selected = true;
        // if (sugested && sugestionValue) {
        //   mutate({ sugestionValue, sectionId: section.id, orgId });
        // }
        setSection(section);
      } else {
        section.selected = false;
      }
      return section;
    });
    setSectionList(newArray);
  };

  const handleOpenCartModal = () => {
    setOpenCart(true);
  };

  const handleOpenSugestionModal = () => {
    setOpenSugestion(!openSugestion);
  };

  // const getProductSugestions = async () => {
  //   if (!sugestionValue) {
  //     alert("insira um valor");
  //   }
  //   if (!sugestionValue) {
  //     return;
  //   }
  //   mutate({ sugestionValue, sectionId: section.id, orgId });
  //   setSugested(true);
  //   setOpenSugestion(false);
  // };

  // const handlerCleanSugestion = () => {
  //   setSugested(false);
  //   setSugestionValue(undefined);
  //   refetchGetProducts();
  // };

  const closeModalAdditional = () => {
    if (
      productSelected?.obrigatoryAdditional &&
      (!productSelected.additional || productSelected?.additional?.length == 0)
    ) {
      const validateClose = confirm(
        "Você precisa escolher um adicional para esse item para inseri-lo no carrinho, tem certeza que deseja prosseguir?",
      );
      if (validateClose) {
        setProductSelected(undefined);
      }
    } else {
      addProduct(productSelected!);
      setProductSelected(undefined);
    }
  };

  const addProduct = (product: BoughtProduct) => {
    let newArray = [...boughtProducts];
    let hasProduct = false;
    newArray = newArray.map((item) => {
      if (item.idsAccumulator! == product.idsAccumulator!) {
        item.quantity += 1;
        hasProduct = true;
      }
      return item;
    });
    if (!hasProduct) {
      product.quantity += 1;
      newArray.push(product);
    }
    setQtdItens((value) => {
      window.sessionStorage.setItem(
        "bougthProductsTotal",
        (value + 1).toString(),
      );
      return value + 1;
    });
    setBoughtProducts(newArray);
    window.sessionStorage.setItem("bougthProducts", JSON.stringify(newArray));
  };

  const handlerAddProduct = (product: Product) => {
    const boughtProduct = new BoughtProduct(product);
    if (boughtProduct.hasAdditional) {
      setProductSelected(boughtProduct);
      return;
    }
    addProduct(boughtProduct);
  };

  const handlerRemoveProduct = (product: BoughtProduct) => {
    let newArray: BoughtProduct[] = [...boughtProducts];
    const newArrayProducts: BoughtProduct[] = newArray
      .map((item) => {
        if (item && item.idsAccumulator! == product.idsAccumulator! && item.quantity > 0) {
          item.quantity -= 1;
          setQtdItens((value) => {
            window.sessionStorage.setItem(
              "bougthProductsTotal",
              (value - 1).toString(),
            );
            return value - 1;
          });
        }
        if (!item || item.quantity == 0) {
          return null;
        }
        return item;
      })
      .filter((e) => e != null);
    setBoughtProducts(newArrayProducts);
    window.sessionStorage.setItem(
      "bougthProducts",
      JSON.stringify(boughtProducts),
    );
  };

  const saveAdditionalToProduct = (
    selectedProduct: BoughtProduct,
    additionalSection: AdditionalSection[],
  ) => {
    if (additionalSection.length == 0) {
      closeModalAdditional();
      return;
    }
    let errorValidateSection;
    dataGetAdditionalSections.forEach((sectionStatic) => {
      const sectionChosedByUser = additionalSection.find(
        (item) => item.id == sectionStatic.id,
      );
      if (
        (sectionStatic.minPerAddition && !sectionChosedByUser) ||
        (sectionChosedByUser?.additionalProducts &&
          sectionChosedByUser?.additionalProducts?.length <
            sectionStatic.minPerAddition!)
      ) {
        alert(
          `Opa, ainda faltam adicionais a serem selecionados na sessão *${sectionStatic.title}*!`,
        );
        errorValidateSection = true;
      }
    });
    if (errorValidateSection) {
      return;
    }
    const flatedAdditional = additionalSection.flatMap(
      (ads) => ads.additionalProducts!,
    );
    selectedProduct.additional = flatedAdditional;
    selectedProduct.reCalculate();
    addProduct(selectedProduct);
    setProductSelected(undefined);
    setAdditionalSection([]);
  };

  return (
    <ThemeProvider bgColor={bgColor} fontColor={fontColor}>
      <Sections sections={sectionList} changeSection={changeSection} />
      <div style={{ margin: "auto", maxWidth: "600px" }}>
        {isPendingProducts ? (
          <div className="w-100 mt-5 flex justify-center">
            <Loading fontColor={fontColor} bgColor={bgColor} />
          </div>
        ) : /*sugested &&*/ dataSugested && dataSugested.products ? (
          <>
            {/* <SugestedBadge
              sugested={sugested}
              onClose={handlerCleanSugestion}
              length={dataSugested!.products.length}
              value={dataSugested.totalSugested}
            /> */}
            {/* <Products
              products={dataSugested.products}
              onAddProduct={handlerAddProduct}
              boughtProducts={boughtProducts}
            /> */}
          </>
        ) : (
          <Products
            boughtProducts={boughtProducts}
            products={dataGetProducts}
            onAddProduct={handlerAddProduct}
          />
        )}
      </div>

      <FloatingButton bottomPosition="bottom-10">
        <>
          {boughtProducts.length > 0 && (
            <div
              style={{
                marginLeft: "-10px",
                marginBottom: "-20px",
                zIndex: "10",
              }}
              className="rouded align-center relative flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <span className="m-auto">{qtdItems}</span>
            </div>
          )}
          <button
            onClick={handleOpenCartModal}
            className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
          >
            <p>Carrinho</p>
          </button>
        </>
      </FloatingButton>

      {/* <FloatingButton bottomPosition="bottom-6" >
                <button onClick={handleOpenSugestionModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg" >
                    <p>Sugestão $$</p>
                </button>
            </FloatingButton > */}

      {/* <SugestionModal
        open={openSugestion}
        onOpenChange={setOpenSugestion}
        description="Insira um valor que iremos te sugerir opções aproximadas desse valor"
        title="Até quanto você pretende gastar?"
        saveButton={
          <>
            <Button variant="outline" onClick={(e) => getProductSugestions()}>
              Filtrar produtos
            </Button>
          </>
        }
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
      </SugestionModal> */}
      <CartModal
        open={openCart}
        onOpenChange={(value) => {
          if (!isPending) setOpenCart(value);
        }}
        description="Assim que confirmar, basta fechar o pedido"
        title="Aqui está seus itens"
        saveButton={
          <>
            {isPending || isSuccess ? (
              <div className="w-100 flex justify-center">
                <Loading />
              </div>
            ) : (
              <>
                {boughtProducts.length > 0 && (
                  <p className="my-2">
                    Total: R$
                    {boughtProducts
                      .map((b) => (b.price ?? 0) * b.quantity)
                      .reduce((previous, current) => previous + current)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                )}

                <Button
                  variant="outline"
                  onClick={(e) =>
                    mutateOrder({
                      products: boughtProducts.map((b) => ({
                        id: b.id,
                        hash: b.hash!,
                        title: b.title,
                        value: b.value,
                        orgId: b.orgId,
                        obrigatoryAdditional: b.obrigatoryAdditional,
                        quantity: b.quantity,
                        price: b.price,
                        additionals: b.additional?.map((adtB) => ({
                          id: adtB.product.id,
                          ownerId: adtB.productOwner.id,
                          hash: b.hash!,
                        })),
                      })),
                      orgId,
                      name: "CLIENTE NAO FINALIZADO",
                    })
                  }
                >
                  Fechar pedido
                </Button>
                <Button
                  className="mb-2"
                  variant="outline"
                  onClick={(e) => {
                    setBoughtProducts([]);
                    setQtdItens(0);
                    window.sessionStorage.clear();
                    setOpenCart(false);
                  }}
                >
                  Limpar carrinho
                </Button>
              </>
            )}
          </>
        }
      >
        <>
          {boughtProducts.map((item, i) => (
            <>
              <div className="my-4 flex items-start truncate">
                <div className="mx-4 flex flex-col items-center">
                  <span
                    className="font-lg cursor-pointer"
                    onClick={() => addProduct(item)}
                  >
                    <UpIcon />
                  </span>
                  <span>
                    <b>{item.quantity} x </b>
                  </span>
                  <span
                    className="font-lg cursor-pointer"
                    onClick={() => handlerRemoveProduct(item)}
                  >
                    <DownIcon />
                  </span>
                </div>
                <div className="self-center">
                  <p className="mb-2 truncate">
                    {item.value &&
                      `[R$ ${item.value.toFixed(2).replace(".", ",")}] `}
                    {item.title}
                  </p>
                  <div className="mt-2">
                    {item.additional &&
                      item.additional.map((add) => (
                        <p className="ml-4">
                          {add.product.value &&
                            ` + [R$ ${add.product.value?.toFixed(2).replaceAll(".", ",")}] `}
                          {` ${add.product.title}`}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </>
      </CartModal>
      <AdditionalModal
        open={Boolean(productSelected)}
        onOpenChange={closeModalAdditional}
        title="Escolha seu Adicional"
        saveButton={
          <>
            <Button
              variant="outline"
              onClick={(e) =>
                saveAdditionalToProduct(productSelected!, additionalSection)
              }
            >
              Adicionar
            </Button>
          </>
        }
      >
        <AdditionalList
          obrigatory={productSelected?.obrigatoryAdditional ?? false}
          loading={isPendingAdditional}
          additionalSection={dataGetAdditionalSections}
          setAdditionalSection={setAdditionalSection}
        />
      </AdditionalModal>
    </ThemeProvider>
  );
}
