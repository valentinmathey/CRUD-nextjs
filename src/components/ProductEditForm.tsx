"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

// Definir la interfaz del producto
interface Product {
    name: string;
    price: string;
    description: string;
}

const ProductEditForm = () => {
    const router = useRouter();
    const params = useParams();
    const [product, setProduct] = useState<Product>({ name: "", price: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<"saving" | "cancelling" | null>(null);
    const [dots, setDots] = useState("."); // Animación de puntos "..."

    // ✅ Cargar los datos del producto actual
    useEffect(() => {
        const fetchProduct = async () => {
            if (!params?.id) return;

            try {
                const { data } = await axios.get(`/api/products/${params.id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    // 🔹 Efecto para la animación de puntos "..." (300ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 300);
        return () => clearInterval(interval);
    }, []);

    // ✅ Manejar cambios en los inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // ✅ Manejar envío del formulario (PUT request)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing("saving");

        try {
            await axios.put(`/api/products/${params.id}`, product);
            setTimeout(() => {
                router.push(`/products/${params.id}`);
            }, 1000);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    // ✅ Manejar cancelación con carga
    const handleCancel = () => {
        setProcessing("cancelling");
        setTimeout(() => router.push(`/products/${params.id}`), 0);
    };

    // 🌀 Pantalla de carga con spinner y animación de puntos
    if (loading || processing)
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
                <div className="w-12 h-12 border-4 border-t-transparent border-blue-400 rounded-full animate-spin mb-4"></div>
                <p className="text-2xl font-semibold">
                    {processing === "saving" ? "Guardando cambios" : "Cargando"}{dots}
                </p>
            </div>
        );

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <form
                className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                    Editar Producto
                </h2>

                {/* Nombre del producto */}
                <label className="block text-gray-600 text-sm font-medium mb-1">
                    Nombre del Producto
                </label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4 text-gray-800"
                    onChange={handleChange}
                />

                {/* Precio del producto */}
                <label className="block text-gray-600 text-sm font-medium mb-1">
                    Precio del Producto
                </label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4 text-gray-800"
                    onChange={handleChange}
                />

                {/* Descripción del producto */}
                <label className="block text-gray-600 text-sm font-medium mb-1">
                    Descripción
                </label>
                <textarea
                    name="description"
                    value={product.description}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4 resize-none text-gray-800"
                    rows={3}
                    onChange={handleChange}
                />

                {/* Botones */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition-all"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEditForm;
