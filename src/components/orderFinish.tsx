"use client"

import ThemeProvider from "~/context/themeProvider"
import Order from "~/domain/order"
import Back from "./ui/back"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { UserInfosModal } from "./userInfos"
import { useState } from "react"

export type OrderFinishProps = {
    order: Order
    bgColor: string,
    fontColor: string
}
export default function OrderFinish({ order, bgColor, fontColor }: OrderFinishProps) {
    const [openUserInfos, setOpenUserInfos] = useState(false);

    return (
        <ThemeProvider bgColor={bgColor} fontColor={fontColor}>
            <div className="blockquote animate__slideInDown animate__animated bg-white sm:m-auto mx-4 h-[95%] mb-4" style={{ maxWidth: "600px" }}>
                <div className="flex">
                    <Back />
                    <p className="ml-4 text-xl mb-2">Seu pedido deu R${order.total.toFixed(2).replace(".", ",")}</p>
                </div>

                <hr />
                <div className="overflow-y-auto h-[80%] mx-4">
                    {order.products.map((item, i) => <p className="text-md my-4 truncate text-left">
                        {item.quantity}x
                        [R$ {(item.value).toFixed(2).replace(".", ",")}]
                        {"  "}
                        {item.title}
                        {"  "}
                    </p>)}
                </div>
                <p className="mt-4">Total: R$ {order.products.map(b => (b.value * b.quantity)).reduce((previous, current) => previous + current).toFixed(2).replace(".", ",")}</p>
                <button onClick={() => { setOpenUserInfos(true) }} className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg" >
                    <p>Enviar para Whatsapp</p>
                </button>
            </div>
            <UserInfosModal
                open={openUserInfos}
                onOpenChange={setOpenUserInfos}
                description="Insira um valor que iremos te sugerir opções aproximadas desse valor"
                title="Até quanto você pretende gastar?"
                saveButton={<>
                    <Button variant="outline" onClick={(e) => { }}>
                        Configurar Endereço
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
                        onChange={(e) => { }}
                        id="sugestionValue"
                    />
                </>
            </UserInfosModal>
        </ThemeProvider>
    )
}