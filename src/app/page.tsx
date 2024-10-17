
import { api } from "~/trpc/server";
import { SectionItem } from "~/components/section";
import Menu from "~/components/menu";
import Product from "~/domain/product";

export default async function Home() {
  const sections: SectionItem[] = [
    {
      selected: true,
      title: "Lanche",
      id: 1,
    },
    {
      selected: false,
      title: "Bebida",
      id: 2,
    },
    {
      selected: false,
      title: "Salgado",
      id: 3,
    }
  ]
  let data = await api.menu.getProducts({ sectionId: sections[0]!.id })
  const products: Product[] = data.products.map(prod => ({
    ...prod
  }))

  return (
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
        <Menu bgColor="#FFF" products={products} sections={sections} />
      </div>
    </main>
  );
}
