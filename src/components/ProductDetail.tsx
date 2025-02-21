"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

// 🔹 Interfaz que define la estructura del producto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function ProductDetail() {
    const router = useRouter();
    const params = useParams();

    // 🔹 Estados del componente
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true); // Estado de carga inicial
    const [processing, setProcessing] = useState<"loading" | "saving" | "deleting" | "returning" | null>(null);
    const [dots, setDots] = useState("."); // Animación de puntos "..."

    // 🔹 Efecto para obtener el producto cuando cambia el parámetro `id`
    useEffect(() => {
        if (!params?.id) return;

        const fetchProduct = async () => {
            const startTime = Date.now(); // ⏳ Registrar tiempo de inicio

            try {
                const { data } = await axios.get(`/api/products/${params.id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            } finally {
                const elapsedTime = Date.now() - startTime;
                const minDelay = 1000; // ⏳ Mínimo 1 segundo de carga

                if (elapsedTime < minDelay) {
                    setTimeout(() => setLoading(false), minDelay - elapsedTime);
                } else {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [params]);

    // 🔹 Efecto para la animación de puntos "..." (300ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 300); // ⏳ Ahora más rápido (300ms en vez de 500ms)
        return () => clearInterval(interval);
    }, []);

    // ✅ Función para volver con animación de carga
    const handleReturn = () => {
        setProcessing("returning"); // 🔹 Estado de "Cargando productos..."
        setTimeout(() => {
            router.push("/products");
        }, 1000); // ⏳ Retraso de 1 segundo antes de redirigir
    };

    // ✅ Función para eliminar producto correctamente
    const handleDelete = async () => {
        setProcessing("deleting"); // 🔹 Estado de "Eliminando producto..."

        try {
            await axios.delete(`/api/products/${params.id}`);
            setTimeout(() => {
                router.push("/products"); // 🔹 Redirigir después de 1 segundo
            }, 1000);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            setProcessing(null); // 🔹 Detener animación si hay error
        }
    };

    // ✅ Función para editar producto
    const handleEdit = () => {
        setProcessing("loading"); // 🔹 Estado de "Cargando..."
        setTimeout(() => {
            router.push(`/products/edit/${params.id}`);
        }, 1000); // ⏳ Retraso de 1 segundo antes de redirigir
    };

    // 🌀 Pantalla de carga con spinner y animación de puntos "..."
    if (loading || processing)
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
                {/* 🔹 Spinner de carga */}
                <div className="w-12 h-12 border-4 border-t-transparent border-blue-400 rounded-full animate-spin mb-4"></div>
                <p className="text-2xl font-semibold">
                    {processing === "returning"
                        ? "Cargando productos"
                        : processing === "saving"
                        ? "Guardando cambios"
                        : processing === "deleting"
                        ? "Eliminando producto"
                        : "Cargando"}
                    {dots}
                </p>
            </div>
        );

    // 🔹 Si el producto no existe, mostrar mensaje de error
    if (!product)
        return <p className="text-red-500 text-center text-3xl font-semibold">Producto no encontrado</p>;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-10">
            <div className="max-w-3xl w-full text-center">
                {/* 🔹 Información del producto */}
                <h1 className="text-5xl font-bold text-blue-400">{product.name}</h1>
                <p className="text-xl text-gray-300 mt-4">{product.description}</p>
                <span className="block text-4xl font-bold text-green-400 mt-6">
                    ${Number(product.price).toFixed(2)}
                </span>

                {/* 🔹 Botones de acción */}
                <div className="mt-8 flex gap-4 justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
                        onClick={handleReturn}
                    >
                        Volver
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
                        onClick={handleEdit}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
