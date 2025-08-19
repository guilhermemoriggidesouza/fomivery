import { ListProducts } from "~/components/produtos/list";
import Product from "~/domain/product";


// Criando 40 produtos exemplos
const products: Product[] = [
    new Product(1, "Produto 1", 101, false, 10.99, 1, 2, "Descrição do Produto 1"),
    new Product(2, "Produto 2", 102, true, 15.5, 1, 2, "Descrição do Produto 2"),
    new Product(3, "Produto 3", 103, false, 20, 1, 2, "Descrição do Produto 3"),
    new Product(4, "Produto 4", 104, true, 25.75, 1, 2, "Descrição do Produto 4"),
    new Product(5, "Produto 5", 105, false, 30, 1, 2, "Descrição do Produto 5"),
    new Product(6, "Produto 6", 101, true, 12.5, 1, 2, "Descrição do Produto 6"),
    new Product(7, "Produto 7", 102, false, 14, 1, 2, "Descrição do Produto 7"),
    new Product(8, "Produto 8", 103, true, 19.99, 1, 2, "Descrição do Produto 8"),
    new Product(9, "Produto 9", 104, false, 23.45, 1, 2, "Descrição do Produto 9"),
    new Product(10, "Produto 10", 105, true, 29.99, 1, 2, "Descrição do Produto 10"),
    new Product(11, "Produto 11", 101, false, 11.5, 1, 2, "Descrição do Produto 11"),
    new Product(12, "Produto 12", 102, true, 16, 1, 2, "Descrição do Produto 12"),
    new Product(13, "Produto 13", 103, false, 21, 1, 2, "Descrição do Produto 13"),
    new Product(14, "Produto 14", 104, true, 26.5, 1, 2, "Descrição do Produto 14"),
    new Product(15, "Produto 15", 105, false, 31, 1, 2, "Descrição do Produto 15"),
    new Product(16, "Produto 16", 101, true, 13.5, 1, 2, "Descrição do Produto 16"),
    new Product(17, "Produto 17", 102, false, 14.75, 1, 2, "Descrição do Produto 17"),
    new Product(18, "Produto 18", 103, true, 20.5, 1, 2, "Descrição do Produto 18"),
    new Product(19, "Produto 19", 104, false, 24, 1, 2, "Descrição do Produto 19"),
    new Product(20, "Produto 20", 105, true, 30, 1, 2, "Descrição do Produto 20"),
    new Product(21, "Produto 21", 101, false, 11, 1, 2, "Descrição do Produto 21"),
    new Product(22, "Produto 22", 102, true, 17, 1, 2, "Descrição do Produto 22"),
    new Product(23, "Produto 23", 103, false, 22, 1, 2, "Descrição do Produto 23"),
    new Product(24, "Produto 24", 104, true, 27, 1, 2, "Descrição do Produto 24"),
    new Product(25, "Produto 25", 105, false, 32, 1, 2, "Descrição do Produto 25"),
    new Product(26, "Produto 26", 101, true, 14, 1, 2, "Descrição do Produto 26"),
    new Product(27, "Produto 27", 102, false, 15, 1, 2, "Descrição do Produto 27"),
    new Product(28, "Produto 28", 103, true, 21.5, 1, 2, "Descrição do Produto 28"),
    new Product(29, "Produto 29", 104, false, 24.5, 1, 2, "Descrição do Produto 29"),
    new Product(30, "Produto 30", 105, true, 30.5, 1, 2, "Descrição do Produto 30"),
    new Product(31, "Produto 31", 101, false, 11.75, 1, 2, "Descrição do Produto 31"),
    new Product(32, "Produto 32", 102, true, 18, 1, 2, "Descrição do Produto 32"),
    new Product(33, "Produto 33", 103, false, 23.5, 1, 2, "Descrição do Produto 33"),
    new Product(34, "Produto 34", 104, true, 28, 1, 2, "Descrição do Produto 34"),
    new Product(35, "Produto 35", 105, false, 33, 1, 2, "Descrição do Produto 35"),
    new Product(36, "Produto 36", 101, true, 15, 1, 2, "Descrição do Produto 36"),
    new Product(37, "Produto 37", 102, false, 15.5, 1, 2, "Descrição do Produto 37"),
    new Product(38, "Produto 38", 103, true, 22, 1, 2, "Descrição do Produto 38"),
    new Product(39, "Produto 39", 104, false, 25, 1, 2, "Descrição do Produto 39"),
    new Product(40, "Produto 40", 105, true, 31.5, 1, 2, "Descrição do Produto 40"),
];

export default function ProductsPage() {
    return (
        <main className="container mx-auto p-6 h-[100vh] overflow-auto">
            <ListProducts products={products.map((product) => ({ ...product }))} />
        </main>
    );
}