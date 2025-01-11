"use client";

export default function NotFound() {
  return (
    <>
      <div className="align-center m-2 h-screen items-center lg:flex">
        <div className="text-center text-lg lg:mr-12 lg:w-1/2 lg:text-right">
          <p className="m-auto mb-12 w-min border-b border-slate-400 lg:mb-0 lg:w-full lg:border-none">
            <b>Cardap.io</b>
          </p>
        </div>
        <div className="text-center text-sm lg:w-1/2 lg:text-left">
          <div className="border-slate-400 lg:border-l lg:pl-12">
            <p>Ops, não achei esse Cardap.io</p>
            <p>
              Confira nossa pagina e para ter acesso ao melhor cardápio online!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
