"use client"

import ThemeProvider from "~/context/themeProvider"
import Order from "~/domain/order"

export type OrderFinishProps = {
    order: Order
    bgColor: string,
    fontColor: string
}
export default function OrderFinish({ order, bgColor, fontColor }: OrderFinishProps) {
    return (
        <ThemeProvider bgColor={bgColor} fontColor={fontColor}>
            <div className="blockquote animate__slideInDown animate__animated bg-white lg:m-auto mx-4 h-[95%] mb-4" style={{ maxWidth: "600px" }}>
                teste {order.products.length}
            </div>
        </ThemeProvider>
    )
}