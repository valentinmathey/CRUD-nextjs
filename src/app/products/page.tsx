import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";

// Detectar si estamos en producción o desarrollo
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Función para obtener productos en el servidor
async function fetchProducts() {
    try {
        const res = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
        if (!res.ok) throw new Error("Error al cargar los productos");
        return await res.json();
    } catch (error) {
        console.error("Error en fetchProducts:", error);
        return []; // Devuelve un array vacío en caso de error// Devuelve un array vacío en caso de error
    }
}

export default async function ProductsPage() {
    const products = await fetchProducts();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="p-10">
                <h2 className="text-3xl font-bold mb-6">Lista de Productos</h2>
                <ProductList initialProducts={products} />
            </div>
        </div>
    );
}
