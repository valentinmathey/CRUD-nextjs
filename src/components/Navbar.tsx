"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter(); // 🔹 Hook para la navegación en Next.js

    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* 🔹 Título del Navbar */}
                <h1 className="text-white text-2xl font-bold">Gestor de Productos</h1>

                {/* 🔹 Botón para agregar un nuevo producto */}
                <button
                    onClick={() => router.push("products/new")} // Redirige a la página de creación de productos
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                    + Agregar Producto
                </button>
            </div>
        </nav>
    );
}
