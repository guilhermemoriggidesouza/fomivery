"use client"

import ThemeProvider from "~/context/themeProvider"
import Order from "~/domain/order"
import Back from "./ui/back"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { UserInfosModal } from "./userInfos"
import { useState } from "react"
import Product from "~/domain/product"
import Org from "~/domain/org"

export type OrderFinishProps = {
    order: Order
    bgColor: string,
    fontColor: string,
    org: Org
}
export default function OrderFinish({ order, bgColor, fontColor, org }: OrderFinishProps) {
    const [openUserInfos, setOpenUserInfos] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");

    const fetchCep = async (cep: string) => {
        const addressInfo = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json())
        setAddress(`${addressInfo.logradouro}, ${addressInfo.bairro}, ${addressInfo.localidade}, ${addressInfo.uf}`)
    }

    const handleZipCode = (event: any) => {
        let input = event.target
        input.value = zipCodeMask(input.value)
    }

    const zipCodeMask = (value: string) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
        return value
    }

    const handlerSendWhats = () => {
        const listProducts = order.products.reduce((previous: string, current: Product) => {
            previous += `- *${current.quantity}x ${current.title}*%0A`
            return previous
        }, "")
        const text = `PEDIDO:[${order.id}]%0AOlá meu nome é *${name}*, gostaria de pedir:%0A${listProducts}Para entregar no endereço:%0A*${address}, ${number}*%0A_Para mais informações do pedido acesse:_%0A${window.location.href}`
        window.open(`https://api.whatsapp.com/send?phone=${org.telephone}&text=${text}`, '_blank')!.focus();

    }

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
                description="Quase lá, informe seus dados para montarmos seu pedido"
                title="Informações pessoais"
                saveButton={<>
                    <Button variant="outline" onClick={handlerSendWhats}>
                        Enviar WhatsApp
                    </Button>
                </>}
            >
                <>
                    <Label htmlFor="name" className="text-left">
                        Nome Completo:
                    </Label>
                    <Input
                        type="text"
                        placeholder="Seu Nome"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        id="name"
                    />
                    {/* <Label htmlFor="email" className="text-left">
                        Email:
                    </Label>
                    <Input
                        type="text"
                        placeholder="email@host.com"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        id="email"
                    /> */}
                    <Label htmlFor="cep" className="text-left">
                        Cep (Opcional para rápido preenchimento):
                    </Label>
                    <Input
                        type="text"
                        placeholder="00000-000"
                        onKeyUp={handleZipCode}
                        maxLength={9}
                        onChange={(e: any) => {
                            if (e.target.value.length == 9) {
                                fetchCep(e.target.value)
                            }
                        }}
                        id="cep"
                    />
                    <Label htmlFor="address" className="text-left">
                        Endereço:
                    </Label>
                    <Input
                        type="text"
                        value={address}
                        placeholder="Rua, Bairro, Cidade"
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                        id="address"
                    />
                    <Label htmlFor="addessMore" className="text-left">
                        Numero e Complemento:
                    </Label>
                    <Input
                        type="text"
                        placeholder="Numero e Complemento"
                        onChange={(e) => {
                            setNumber(e.target.value)
                        }}
                        id="addessMore"
                    />
                    <i>O valor do pedido deve ser pago na entrega</i>
                </>
            </UserInfosModal>
        </ThemeProvider>
    )
}