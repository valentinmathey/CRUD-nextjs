"use client";

import Link from "next/link";

// 🔹 Interfaz que define la estructura del producto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            {/* 🔹 Nombre del producto */}
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>

            {/* 🔹 Descripción del producto */}
            <p className="text-gray-600 mt-1">{product.description}</p>

            {/* 🔹 Precio del producto */}
            <span className="block text-lg font-bold text-blue-600 mt-3">
                ${Number(product.price).toFixed(2)}
            </span>

            {/* 🔹 Botón para ver detalles del producto */}
            <Link href={`/products/${product.id}`}>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all">
                    Ver Detalles
                </button>
            </Link>
        </div>
    );
}
