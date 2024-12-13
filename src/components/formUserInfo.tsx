import Org from "~/domain/org"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { telephoneMask, zipCodeMask } from "./ui/utils"
import Loading from "./ui/loading"

export type FormUserInfoType = {
    name?: string,
    address?: string,
    number?: string,
    complement?: string,
    telephone?: string,
    delivery?: boolean,
    paymentType: 'CARTAO' | 'DINHEIRO' | 'PIX',
    obs?: string
    changePayment?: string,
    deliveryTaxOrder?: number
}

type FormUserInfoProps = {
    setField: (newPayload: any) => void,
    payload: FormUserInfoType,
    org: Org,
    isPendingTaxValue: boolean,
    taxValue?: number
}
export function FormUserInfo({ payload, setField, org, isPendingTaxValue, taxValue }: FormUserInfoProps) {
    const fetchCep = async (cep: string) => {
        const addressInfo = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json())
        if (!addressInfo.logradouro) {
            alert("Opa, não foi possível achar esse cep")
            return
        }
        setField({ address: `${addressInfo.logradouro}, ${addressInfo.bairro}, ${addressInfo.localidade}, ${addressInfo.uf}` })
    }

    const handleZipCode = (event: any) => {
        const input = event.target
        input.value = zipCodeMask(input.value)
    }
    const handleTelephone = (event: any) => {
        const input = event.target
        input.value = telephoneMask(input.value)
    }

    return (<>
        <div className="mb-2">
            <Label htmlFor="name" className="text-left">
                Nome Completo:
            </Label>
            <Input
                type="text"
                placeholder="Seu Nome"
                onChange={(e) => {
                    setField({ name: e.target.value })
                }}
                id="name"
            />
        </div>
        <div className="mb-2">
            <Label htmlFor="telephone" className="text-left">
                Telefone:
            </Label>
            <Input
                type="text"
                placeholder="(00) 00000-0000"
                onChange={(e) => {
                    setField({ telephone: e.target.value })
                }}
                onKeyUp={handleTelephone}
                maxLength={15}
                id="telephone"
            />
        </div>
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
        <div className="flex gap-5 mb-2">
            <div className="flex items-center">
                <Checkbox
                    id="delivery"
                    checked={payload.delivery}
                    onCheckedChange={(e) => {
                        setField({ delivery: true })
                    }}
                />
                <Label htmlFor="delivery" className="ml-2">
                    Entrega
                </Label>
            </div>
            <div className="flex items-center">
                <Checkbox
                    id="notDelivery"
                    checked={!payload.delivery}
                    onCheckedChange={(e) => {
                        setField({ delivery: false })
                    }}
                />
                <Label htmlFor="notDelivery" className="ml-2">
                    Retirada
                </Label>
            </div>
        </div>
        {payload.delivery && (
            <>
                <div className="my-2">
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
                </div>
                <div className="mb-2">
                    <Label htmlFor="address" className="text-left">
                        Endereço:
                    </Label>
                    <div className="flex">
                        <div className="w-[80%] mr-2">
                            <Input
                                type="text"
                                value={payload.address}
                                placeholder="Rua, Bairro, Cidade e Numero"
                                onChange={(e) => {
                                    setField({ address: e.target.value })
                                }}
                                id="address"
                            />
                        </div>
                        <div className="w-[20%]">
                            <Input
                                type="text"
                                placeholder="Nº"
                                onChange={(e) => {
                                    setField({ number: e.target.value })
                                }}
                                id="Number"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <Label htmlFor="addessMore" className="text-left">
                        Complemento:
                    </Label>
                    <Input
                        type="text"
                        placeholder="Complemento"
                        onChange={(e) => {
                            setField({ complement: e.target.value })
                        }}
                        id="addessMore"
                    />
                </div>
                <div className="mb-2">
                    {isPendingTaxValue ? <div><Loading /> Calculando taxa de entrega</div> : taxValue ? <p>Total de entrega: R$ {taxValue!.toFixed(2).replace(".", ",")}</p> : null}
                </div>
            </>
        )}
        <p className="text-left">
            Qual a forma de pagamento?:
        </p>
        <div className="flex items-center mb-2">
            <Checkbox
                id="paymentTypeCard"
                checked={Boolean(payload.paymentType == "CARTAO")}
                onCheckedChange={(e) => {
                    if (e) {
                        setField({ paymentType: "CARTAO" })
                        setField({ changePayment: undefined })
                    }
                }}
            />
            <Label htmlFor="paymentTypeCard" className="ml-2">
                Cartão
            </Label>
        </div>
        <div className="flex items-center mb-2">
            <Checkbox
                id="paymentTypeMoney"
                checked={Boolean(payload.paymentType == "DINHEIRO")}
                onCheckedChange={(e) => {
                    if (e) {
                        setField({ paymentType: "DINHEIRO" })
                    }
                }}
            />
            <Label htmlFor="paymentTypeMoney" className="ml-2">
                Dinheiro
            </Label>
        </div>
        <div className="flex items-center mb-2">
            <Checkbox
                id="paymentTypePix"
                checked={Boolean(payload.paymentType == "PIX")}
                onCheckedChange={(e) => {
                    if (e) {
                        setField({ paymentType: "PIX" })
                    }
                }}
            />
            <Label htmlFor="paymentTypePix" className="ml-2">
                Pix
            </Label>
        </div>
        {payload.paymentType == "DINHEIRO" ? <>
            <Label htmlFor="changePayment" className="text-left">
                Troco para quantos?:
            </Label>
            <Input
                type="number"
                placeholder="20"
                onChange={(e) => {
                    setField({ changePayment: e.target.value })
                }}
                id="changePayment"
            />
        </> : null}
        <div className="my-2">
            <Label htmlFor="obs" className="text-left">
                Observações:
            </Label>
            <Textarea
                placeholder="Adicione sua observação"
                onChange={(e) => {
                    setField({ obs: e.target.value })
                }}
                id="obs"
            />
        </div>
    </>

    )
}