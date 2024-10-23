
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
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
                    Teste
                </div>
            </main>
        </HydrateClient>
    );
}
