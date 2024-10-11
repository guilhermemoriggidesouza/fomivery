
import { HydrateClient } from "~/trpc/server";
import { ProductItem } from "~/components/product";
import Products from "~/components/products";
import Sections from "~/components/sections";
import { SectionProps } from "~/components/section";

export default async function Home() {
  const products: ProductItem[] = [
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
    { id: 1, title: "teste", description: "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ", value: "10.0", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrzbIeDjaozbJQ1Tw8eaf0ZynAgzImP4bEA&s" },
  ]
  const sections: SectionProps[] = [
    {
      title: "bebida",
      id: 1,
    },
    {
      title: "comida",
      id: 2,
    },
    {
      title: "Salgado",
      id: 3,
    },
    {
      title: "Pilili",
      id: 4,
    },
    {
      title: "Pololo",
      id: 5,
    },
    {
      title: "Lelele",
      id: 6,
    }
  ]
  return (
    <HydrateClient>
      <main style={{
        color: "#000",
        overflow: "hidden"
      }}>
        <div style={{
          height: "100vh",
          width: "100vw",
          opacity: 0.8,
          backgroundImage: "url(fundo-cardapio.jpg)",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }} />
        <div className="absolute top-0 overflow-auto h-screen m-auto w-screen">
          <Sections sections={sections} bgColor={"#FFF"} />
          <div style={{ margin: "auto", maxWidth: "600px" }}>
            <Products products={products} bgColor={"#FFF"} />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
