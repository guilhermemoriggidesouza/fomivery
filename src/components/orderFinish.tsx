"use client";

import ThemeProvider from "~/context/themeProvider";
import Order, { OrderType } from "~/domain/order";
import Back from "./ui/back";
import { Button } from "./ui/button";
import { UserInfosModal } from "./modal/userInfos";
import { useState } from "react";
import { BoughtProductType } from "~/domain/product";
import Org, { OrgType } from "~/domain/org";
import { api } from "~/trpc/react";
import { FormUserInfo, FormUserInfoType } from "./formUserInfo";
import { telephoneMask } from "./ui/utils";
import { useDebounce } from "@uidotdev/usehooks";

export type OrderFinishProps = {
  orderFirst: OrderType;
  bgColor: string;
  fontColor: string;
  org: OrgType;
};
export default function OrderFinish({
  orderFirst,
  bgColor,
  fontColor,
  org,
}: OrderFinishProps) {
  const [payload, setPayload] = useState<FormUserInfoType>({
    paymentType: "CARTAO",
  });
  const debouncePayload = useDebounce(payload, 2000);
  const finishOrder = () => {
    window.sessionStorage.clear();
  };

  const { isSuccess: isSuccessFinishOrder, mutate: mutateOrder } =
    api.order.finishOrder.useMutation({ onSuccess: finishOrder });
  const {
    isSuccess: isSuccessCalculateTax,
    isFetching: isPendingTaxCalculate,
    data: calculatedTax,
  } = api.order.calculateTax.useQuery(
    {
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
    },
  );

  const { isPending: isPendingOrder, data: order } =
    api.order.getOrder.useQuery(
      {
        hash: orderFirst!.hash,
      },
      {
        initialData: Order.fromTypeToDomain(orderFirst),
        enabled: isSuccessFinishOrder || isSuccessCalculateTax,
      },
    );

  const handlerSendWhats = () => {
    if (payload.delivery && (!payload.address || !payload.number)) {
      alert("Preencha o endereço corretamente");
      return;
    }
    if (!payload?.name) {
      alert("Está faltando seu nome");
      return;
    }
    if (!payload.telephone) {
      alert("Está faltando seu telefone");
      return;
    }
    const listProducts = order.products.reduce(
      (previous: string, current: BoughtProductType) => {
        previous += `- *${current.quantity}x ${current.title}*%0A`;
        if (current.additional && current.additional.length > 0) {
          previous += "*Com adição de:*%0A";
          previous += `${current.additional?.map((add) => `      - ${add.product.title}`).join("%0A")}%0A`;
        }
        return previous;
      },
      "",
    );
    let total = getTotalValue(order);
    let change: number | undefined;
    if (payload.changePayment) {
      const changeValue = Number(payload.changePayment.replaceAll(",", "."));
      change = changeValue > total ? changeValue - total : undefined;
    }
    const presentationSectionText = `PEDIDO:[${order.id}]%0AOlá meu nome é *${payload.name}*, e eu gostaria de pedir:`;
    const productsSectionText = `${listProducts}%0A%0ATotal: R$${total.toFixed(2).replace(".", ",")}`;
    const paymentSectionText = `Irei pagar no *${payload.paymentType}*%0A${change ? "E preciso de *troco de: R$" + change + "*%0A" : ""}`;
    const deliverySectionText = `${payload.delivery ? `Para entregar no endereço:%0A*${payload.address}, ${payload.number}${payload.complement ? `, ${payload.complement}` : ""}*` : "Para *Retirada*"}`;
    const text = `${presentationSectionText}%0A%0A${productsSectionText}%0A%0A${paymentSectionText}%0A%0A${deliverySectionText}%0A%0A%0AOBSERVAÇÃO: *${payload.obs || ""}*%0A%0A_Para mais informações do pedido acesse:_%0A${window.location.href}`;
    window
      .open(
        `https://api.whatsapp.com/send?phone=${org.telephone}&text=${text}`,
        "_blank",
      )!
      .focus();
    mutateOrder({
      name: payload.name,
      hash: order.hash,
      telephone: payload.telephone,
      obs: payload.obs,
      changePayment: payload.changePayment
        ? Number(payload.changePayment.replaceAll(",", "."))
        : undefined,
      paymentType: payload.paymentType!,
      delivery: Boolean(payload.delivery),
      total,
      address: payload.delivery ? payload.address : undefined,
      tax:
        payload.delivery && calculatedTax ? calculatedTax.taxValue : undefined,
    });
  };

  const getTotalValue = (order: Order) => {
    if (calculatedTax?.taxValue && payload.delivery) {
      return order.total + calculatedTax.taxValue;
    }
    return order.total + (order.tax ?? 0);
  };
  const getProductValue = (order: Order) => {
    if (order.tax) {
      return order.total - order.tax;
    } else {
      return order.total;
    }
  };
  return (
    <ThemeProvider bgColor={bgColor} fontColor={fontColor}>
      <div
        className="blockquote animate__slideInDown animate__animated m-auto mb-4 ml-1 border bg-white sm:m-auto md:w-1/2 xl:w-1/3"
        style={{
          color: fontColor,
          backgroundColor: bgColor,
        }}
      >
        <div className="flex">
          <Back />
          <p className="my-2 mr-5 w-full text-center text-xl">
            {order.finishAt
              ? "Detalhes do pedido"
              : "Digite suas informações para concluir o pedido"}
          </p>
        </div>
        <div className="m-4 overflow-y-auto border p-4 text-left">
          {!order.finishAt ? (
            <FormUserInfo
              isPendingTaxValue={isPendingTaxCalculate}
              taxValue={calculatedTax?.taxValue}
              setField={(newPayload) => {
                setPayload((oldPayload) => {
                  return {
                    ...oldPayload,
                    ...newPayload,
                  };
                });
              }}
              org={org as Org}
              payload={payload}
            />
          ) : (
            <>
              {order.products.map((item, i) => (
                <>
                  <p key={i} className="text-md mt-4">
                    {item.quantity} x
                    {item.value &&
                      ` [R$ ${item.value!.toFixed(2).replace(".", ",")}] `}
                    {item.title}
                  </p>
                  {item.additional?.map((add, i) => (
                    <p key={i} className="ml-10">
                      {add.product.value &&
                        ` + [R$ ${add.product.value!.toFixed(2).replace(".", ",")}] `}
                      {add.product.title}
                    </p>
                  ))}
                </>
              ))}
            </>
          )}
        </div>
        <hr />
        <div className="mb-2 flex flex-col items-center justify-center">
          {order.finishAt ? (
            <>
              <p className="mt-4">
                Total produtos: R$
                {getProductValue(order).toFixed(2).replace(".", ",")}
              </p>
              {order.tax && (
                <p>
                  Taxa de entrega: R$ {order.tax.toFixed(2).replace(".", ",")}
                </p>
              )}
              <div className="flex text-lg">
                <p className="w-full text-center">
                  <b>Seu pedido foi feito com sucesso!</b>
                </p>
              </div>
              <p className="w-full text-center">
                <i>
                  caso tenha uma duvida, basta entrar em contato no número:
                  <br />
                  {telephoneMask(org.telephone)}
                </i>
              </p>
            </>
          ) : (
            <>
              <p className="mb-2 ml-4 text-xl">
                <strong>
                  TOTAL PEDIDO: R$
                  {getTotalValue(order).toFixed(2).replace(".", ",")}
                </strong>
              </p>
              {payload.delivery && !calculatedTax?.taxValue && (
                <i>Para continuar, aguarde o calculo da entrega</i>
              )}
              <button
                disabled={payload.delivery && !calculatedTax?.taxValue}
                onClick={handlerSendWhats}
                className={`mx-4 mb-4 rounded-full ${payload.delivery && !calculatedTax?.taxValue ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} px-4 py-2 font-bold text-white shadow-lg`}
              >
                <p>Enviar para Whatsapp</p>
              </button>
            </>
          )}
        </div>
        <div
          className="blockquote-after"
          style={{
            border: `solid 1px linear-gradient(-45deg, transparent 70%, #FFFFFF 75%),linear-gradient( 45deg, transparent 70%, #FFFFFF 75%);`,
            background: `linear-gradient(-45deg, transparent 70%, #FFFFFF 75%),linear-gradient( 45deg, transparent 70%, #FFFFFF 75%);`,
          }}
        ></div>
      </div>
    </ThemeProvider>
  );
}
