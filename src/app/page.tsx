
import { HydrateClient } from "~/trpc/server";
import { SectionItem } from "~/components/section";
import Menu from "~/components/menu";

export default async function Home() {
  const products: Array<{
    id: number,
    description: string,
    title: string,
    value: string,
    image: string,
    sectionId: number
  }> = [
      { sectionId: 1, id: 1, title: "Hambúrguer Clássico Muito pica selóko", description: "Hambúrguer de carne com queijo, alface e tomate.", value: "15.00", image: "https://example.com/images/hamburguer_classico.jpg" },
      { sectionId: 1, id: 2, title: "Cheeseburguer", description: "Hambúrguer com queijo cheddar e molho especial.", value: "17.00", image: "https://example.com/images/cheeseburguer.jpg" },
      { sectionId: 1, id: 3, title: "X-Bacon", description: "Hambúrguer com bacon crocante e queijo.", value: "20.00", image: "https://example.com/images/x_bacon.jpg" },
      { sectionId: 1, id: 4, title: "Hot Dog", description: "Salsicha com molho, cebola e batata palha.", value: "10.00", image: "https://example.com/images/hot_dog.jpg" },
      { sectionId: 3, id: 5, title: "Batata Frita", description: "Porção de batatas fritas crocantes.", value: "8.00", image: "https://example.com/images/batata_frita.jpg" },
      { sectionId: 2, id: 6, title: "Milkshake de Chocolate", description: "Milkshake cremoso de chocolate.", value: "12.00", image: "https://example.com/images/milkshake_chocolate.jpg" },
      { sectionId: 2, id: 7, title: "Refrigerante Lata", description: "Refrigerante em lata de 350ml.", value: "5.00", image: "https://example.com/images/refrigerante_lata.jpg" },
      { sectionId: 3, id: 8, title: "Sanduíche Natural", description: "Sanduíche de peito de peru, alface e tomate.", value: "12.00", image: "https://example.com/images/sanduiche_natural.jpg" },
      { sectionId: 1, id: 9, title: "Salada Caesar", description: "Salada com frango grelhado, alface e molho Caesar.", value: "18.00", image: "https://example.com/images/salada_caesar.jpg" },
      { sectionId: 1, id: 10, title: "Pizza Individual", description: "Pizza de calabresa ou marguerita.", value: "25.00", image: "https://example.com/images/pizza_individual.jpg" },
      { sectionId: 3, id: 11, title: "Tapioca", description: "Tapioca recheada com queijo e presunto.", value: "10.00", image: "https://example.com/images/tapioca.jpg" },
      { sectionId: 3, id: 12, title: "Bauru", description: "Sanduíche de queijo, presunto e tomate.", value: "14.00", image: "https://example.com/images/bauru.jpg" },
      { sectionId: 3, id: 13, title: "Coxinha", description: "Coxinha de frango desfiado.", value: "6.00", image: "https://example.com/images/coxinha.jpg" },
      { sectionId: 3, id: 14, title: "Empada", description: "Empada de frango ou carne.", value: "7.00", image: "https://example.com/images/empada.jpg" },
      { sectionId: 1, id: 15, title: "Pipoca", description: "Porção de pipoca salgada.", value: "4.00", image: "https://example.com/images/pipoca.jpg" },
      { sectionId: 2, id: 16, title: "Suco Natural", description: "Suco natural de laranja ou limão.", value: "9.00", image: "https://example.com/images/suco_natural.jpg" },
      { sectionId: 1, id: 17, title: "Misto Quente", description: "Sanduíche quente de queijo e presunto.", value: "10.00", image: "https://example.com/images/misto_quente.jpg" },
      { sectionId: 3, id: 18, title: "Bolinha de Queijo", description: "Porção de bolinhas de queijo fritas.", value: "8.00", image: "https://example.com/images/bolinha_queijo.jpg" },
      { sectionId: 2, id: 19, title: "Café", description: "Café preto ou com leite.", value: "5.00", image: "https://example.com/images/cafe.jpg" },
      { sectionId: 2, id: 20, title: "Chá Gelado", description: "Chá gelado de pêssego ou limão.", value: "6.00", image: "https://example.com/images/cha_gelado.jpg" },
    ];

  for (let i = 21; i <= 200; i++) {
    const randomPrice = (Math.random() * 100).toFixed(2); // Preço entre 0.00 e 100.00
    const arraySec = [1, 2, 3];
    const randomSec = arraySec[Math.floor(Math.random() * arraySec.length)];
    // Preço entre 0.00 e 100.00
    products.push({
      id: i,
      title: `Item ${i} - ${randomSec!}`,
      description: `Descrição do item ${i}.`,
      value: `${randomPrice}`,
      image: `https://example.com/images/item_${i}.jpg`,
      sectionId: randomSec!
    });
  }
  const sections: SectionItem[] = [
    {
      selected: false,
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
          <Menu bgColor="#FFF" products={products} sections={sections} />
        </div>
      </main>
    </HydrateClient>
  );
}
