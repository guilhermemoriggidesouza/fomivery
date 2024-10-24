"use client"

export default function NotFound() {

    return (
        <>
            <div className="lg:flex m-2 h-screen items-center align-center">
                <div className="text-lg lg:w-1/2 lg:text-right text-center lg:mr-12">
                    <p className="lg:border-none border-b border-slate-400 lg:w-full w-min m-auto lg:mb-0 mb-12">
                        <b>Cardap.io</b>
                    </p>
                </div>
                <div className="text-sm lg:w-1/2 lg:text-left text-center ">
                    <div className="lg:border-l lg:pl-12 border-slate-400">
                        <p>Ops, não achei esse Cardap.io</p>
                        <p>Confira nossa pagina e para ter acesso ao melhor cardápio online!</p>
                    </div>
                </div>
            </div>
        </>
    )
}