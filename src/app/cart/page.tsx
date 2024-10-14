
import { HydrateClient } from "~/trpc/server";
import { ProductItem } from "~/components/product";
import Products from "~/components/products";
import Sections from "~/components/sections";
import { SectionItem } from "~/components/section";
import Menu from "~/components/menu";

export default async function Home() {
    const products: Array<{
        id: number,
        description: string,
        title: string,
        value: string,
        image: string,
    }> = [
            { id: 1, title: "Hambúrguer Clássico Muito pica selóko", description: "Hambúrguer de carne com queijo, alface e tomate.", value: "15.00", image: "https://example.com/images/hamburguer_classico.jpg" },
            { id: 2, title: "Cheeseburguer", description: "Hambúrguer com queijo cheddar e molho especial.", value: "17.00", image: "https://example.com/images/cheeseburguer.jpg" },
            { id: 3, title: "X-Bacon", description: "Hambúrguer com bacon crocante e queijo.", value: "20.00", image: "https://example.com/images/x_bacon.jpg" },
            { id: 4, title: "Hot Dog", description: "Salsicha com molho, cebola e batata palha.", value: "10.00", image: "https://example.com/images/hot_dog.jpg" },
        ];

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
                    <Cart />
                </div>
            </main>
        </HydrateClient>
    );
}
