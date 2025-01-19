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
  const [openUserInfos, setOpenUserInfos] = useState(false);
  const [payload, setPayload] = useState<FormUserInfoType>({
    paymentType: "CARTAO",
  });
  const debouncePayload = useDebounce(payload, 2000);
  const finishOrder = () => {
    window.sessionStorage.clear();
    setOpenUserInfos(false);
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
        className="blockquote animate__slideInDown animate__animated mx-4 mb-4 h-[95%] sm:m-auto"
        style={{
          color: fontColor,
          backgroundColor: bgColor,
          maxWidth: "600px",
        }}
      >
        <div className="flex">
          <Back />
          {order.finishAt ? (
            <p className="mb-2 ml-4 text-xl">
              <strong>
                Total do pedido: R$ {order.total.toFixed(2).replace(".", ",")}
              </strong>
            </p>
          ) : (
            <p className="mb-2 ml-4 text-xl">
              <strong>Confira abaixo seu pedido</strong>
            </p>
          )}
        </div>

        <hr />
        <div className="m-4 max-h-[70%] overflow-y-auto truncate text-left">
          {order.products.map((item, i) => (
            <>
              <p key={i} className="text-md mt-4">
                {item.quantity} x
                {item.price &&
                  ` [R$ ${item.price!.toFixed(2).replace(".", ",")}] `}
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
        </div>
        <hr />
        <p className="mt-4">
          Total produtos: R$
          {getProductValue(order).toFixed(2).replace(".", ",")}
        </p>
        {order.tax && (
          <p>Taxa de entrega: R$ {order.tax.toFixed(2).replace(".", ",")}</p>
        )}
        <div className="mt-2 flex flex-col items-center justify-center">
          {order.finishAt ? (
            <>
              <div className="flex text-lg">
                <p className="w-full text-center">
                  <b>Seu pedido foi feito com sucesso!</b>
                </p>
              </div>
              <p className="w-full text-center">
                <i>
                  caso tenha uma duvida, basta entrar em contato no número:
                  {telephoneMask(org.telephone)}
                </i>
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                setOpenUserInfos(true);
              }}
              className="mx-4 mb-4 rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
            >
              <p>Enviar para Whatsapp</p>
            </button>
          )}
        </div>
      </div>
      <UserInfosModal
        open={openUserInfos}
        onOpenChange={setOpenUserInfos}
        description="Quase lá, informe seus dados para montarmos seu pedido"
        title="Informações pessoais"
        saveButton={
          <div className="text-center">
            <p>
              <strong className="text-blue-500">
                TOTAL PEDIDO: R$
                {getTotalValue(order).toFixed(2).replace(".", ",")}
              </strong>
              <br />
              <i>O valor do pedido deve ser pago na entrega</i>
            </p>
            <Button variant="outline" onClick={handlerSendWhats}>
              Enviar WhatsApp
            </Button>
          </div>
        }
      >
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
      </UserInfosModal>
    </ThemeProvider>
  );
}
