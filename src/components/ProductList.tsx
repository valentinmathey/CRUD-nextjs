"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

// 🔹 Interfaz que define la estructura del producto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

// 🔹 Componente que muestra una lista de productos
export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // 🔹 Efecto para cargar los productos desde la API al montar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get<Product[]>("/api/products");
                setProducts(data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* 🔹 Mostrar productos si hay datos, si no, mostrar un mensaje */}
            {products.length > 0 ? (
                products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
                <p className="text-gray-400">No hay productos disponibles.</p>
            )}
        </div>
    );
}
