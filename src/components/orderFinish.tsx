"use client"

import ThemeProvider from "~/context/themeProvider"
import Order, { OrderType } from "~/domain/order"
import Back from "./ui/back"
import { Button } from "./ui/button"
import { UserInfosModal } from "./userInfos"
import { useState } from "react"
import Product from "~/domain/product"
import Org from "~/domain/org"
import { api } from "~/trpc/react"
import { FormUserInfo, FormUserInfoType } from "./formUserInfo"
import { telephoneMask } from "./ui/utils"
import { useDebounce } from "@uidotdev/usehooks";

export type OrderFinishProps = {
    orderFirst: OrderType
    bgColor: string,
    fontColor: string,
    org: Org
}
export default function OrderFinish({ orderFirst, bgColor, fontColor, org }: OrderFinishProps) {
    const [openUserInfos, setOpenUserInfos] = useState(false);
    const [payload, setPayload] = useState<FormUserInfoType>({ paymentType: 'CARTAO' });
    const debouncePayload = useDebounce(payload, 2000)
    const finishOrder = () => {
        window.localStorage.clear()
        setOpenUserInfos(false)
    }

    const { isSuccess: isSuccessFinishOrder, mutate: mutateOrder } = api.order.finishOrder.useMutation({ onSuccess: finishOrder })
    const { isSuccess: isSuccessCalculateTax, isFetching: isPendingTaxCalculate, data: calculatedTax } = api.order.calculateTax
        .useQuery({
            orgId: org.id,
            orgAddress: org.address!,
            clientAddress: `${debouncePayload.address}, ${debouncePayload.number}`,
        },
            {
                enabled: !!debouncePayload.address && !!debouncePayload.number,
                retryOnMount: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                refetchInterval: false,
                refetchOnWindowFocus: false,
                refetchIntervalInBackground: false,
            })

    const { isPending: isPendingOrder, data: order } = api.order.getOrder
        .useQuery({
            hash: orderFirst!.hash
        }, {
            initialData: Order.fromTypeToDomain(
                orderFirst
            ),
            enabled: isSuccessFinishOrder || isSuccessCalculateTax
        })

    const handlerSendWhats = () => {
        if (payload.delivery && (!payload.address || !payload.number)) {
            alert("Preencha o endereço corretamente")
            return
        }
        if (!payload?.name) {
            alert("Está faltando seu nome")
            return
        }
        if (!payload.telephone) {
            alert("Está faltando seu telefone")
            return
        }
        const listProducts = order.products.reduce((previous: string, current: Product) => {
            previous += `- *${current.quantity}x ${current.title}*%0A`
            return previous
        }, "")
        let total = getTotalValue(order)
        let change: number | undefined
        if (payload.changePayment) {
            const changeValue = Number(payload.changePayment.replaceAll(',', '.'))
            change = changeValue > total ? changeValue - total : undefined
        }
        const presentationSectionText = `PEDIDO:[${order.id}]%0AOlá meu nome é *${payload.name}*, e eu gostaria de pedir:`
        const productsSectionText = `${listProducts}%0A%0ATotal: R$${total.toFixed(2).replace(".", ",")}`
        const paymentSectionText = `Irei pagar no *${payload.paymentType}*%0A${change ? 'E preciso de *troco de: R$' + change + '*%0A' : ''}`
        const deliverySectionText = `${payload.delivery ? `Para entregar no endereço:%0A*${payload.address}, ${payload.number}${payload.complement ? `, ${payload.complement}` : ''}*` : 'Para *Retirada*'}`
        const text = `${presentationSectionText}%0A%0A${productsSectionText}%0A%0A${paymentSectionText}%0A%0A${deliverySectionText}%0A%0A%0AOBSERVAÇÃO: *${payload.obs || ""}*%0A%0A_Para mais informações do pedido acesse:_%0A${window.location.href}`
        window.open(`https://api.whatsapp.com/send?phone=${org.telephone}&text=${text}`, '_blank')!.focus();
        mutateOrder({
            name: payload.name,
            hash: order.hash,
            telephone: payload.telephone,
            obs: payload.obs,
            changePayment: payload.changePayment ? Number(payload.changePayment.replaceAll(',', '.')) : undefined,
            paymentType: payload.paymentType!,
            delivery: Boolean(payload.delivery),
            total,
            address: payload.delivery ? payload.address : undefined,
            tax: (payload.delivery && calculatedTax) ? calculatedTax.taxValue : undefined
        })
    }

    const getTotalValue = (order: Order) => {
        if (calculatedTax?.taxValue && payload.delivery) {
            return order.total + calculatedTax.taxValue
        }
        return order.total + (order.tax ?? 0)
    }
    const getProductValue = (order: Order) => {
        if (order.tax) {
            return order.total - order.tax
        } else {
            return order.total
        }
    }
    return (
        <ThemeProvider bgColor={bgColor} fontColor={fontColor}>
            <div className="blockquote animate__slideInDown animate__animated sm:m-auto mx-4 h-[95%] mb-4" style={{ color: fontColor, backgroundColor: bgColor, maxWidth: "600px" }}>
                <div className="flex">
                    <Back />
                    {
                        order.finishAt ? <p className="ml-4 text-xl mb-2"><strong>Total do pedido: R$ {order.total.toFixed(2).replace(".", ",")}</strong></p> : <p className="ml-4 text-xl mb-2"><strong>Confira abaixo seu pedido</strong></p>
                    }
                </div>

                <hr />
                <div className="overflow-y-auto max-h-[70%] mx-4">
                    {order.products.map((item, i) => <p key={i} className="text-md my-4 truncate text-left">
                        {item.quantity}x
                        [R$ {(item.value).toFixed(2).replace(".", ",")}]
                        {"  "}
                        {item.title}
                        {"  "}
                    </p>)}
                </div>
                <hr />
                <div className="flex flex-col justify-center mt-2 items-center h-[20%]">
                    {order.tax && <p className={`${order.finishAt && "mt-4"}`}>Taxa de entrega: R$ {order.tax.toFixed(2).replace(".", ",")}</p>}
                    <p className={`${!order.tax && "mt-4"}`}>Total produtos: R$ {getProductValue(order).toFixed(2).replace(".", ",")}</p>
                    {order.finishAt ?
                        (<>
                            <div className="flex text-lg mt-4">
                                <p className="w-full text-center"><b>Seu pedido foi feito com sucesso!</b></p>
                            </div>
                            <p className="w-full text-center"><i>caso tenha uma duvida, basta entrar em contato no número: {telephoneMask(org.telephone)}</i></p>
                        </>)
                        :
                        (<button onClick={() => { setOpenUserInfos(true) }} className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg mx-4" >
                            <p>Enviar para Whatsapp</p>
                        </button>)
                    }
                </div>
            </div >
            <UserInfosModal
                open={openUserInfos}
                onOpenChange={setOpenUserInfos}
                description="Quase lá, informe seus dados para montarmos seu pedido"
                title="Informações pessoais"
                saveButton={<div className="text-center">
                    <p>
                        <strong>TOTAL PEDIDO: R$ {getTotalValue(order).toFixed(2).replace(".", ",")}</strong>
                        <br /><i>O valor do pedido deve ser pago na entrega</i>
                    </p>
                    <Button variant="outline" onClick={handlerSendWhats}>
                        Enviar WhatsApp
                    </Button>
                </div>}
            >
                <FormUserInfo
                    isPendingTaxValue={isPendingTaxCalculate}
                    taxValue={calculatedTax?.taxValue}
                    setField={(newPayload) => {
                        setPayload(oldPayload => {
                            return {
                                ...oldPayload,
                                ...newPayload,
                            }
                        })
                    }}
                    org={org}
                    payload={payload}
                />
            </UserInfosModal>
        </ThemeProvider >
    )
}