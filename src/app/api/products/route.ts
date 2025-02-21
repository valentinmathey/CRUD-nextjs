import { NextResponse } from "next/server";
import { pool } from "@/libs/db";

// ✅ Interfaz para los datos del producto
interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
}

// ✅ GET: Obtener todos los productos
export async function GET() {
    try {
        const results = await pool.query("SELECT * FROM product") as [Product[]];
        return NextResponse.json(results);
    } catch (error) {
        console.error("Error en GET /products:", error);
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}

// ✅ POST: Insertar un nuevo producto
export async function POST(request: Request) {
    try {
        // Obtener datos del request con tipado
        const { name, description, price }: Product = await request.json();

        // Validar datos antes de insertar
        if (!name || price === undefined) {
            return NextResponse.json(
                { message: "El nombre y el precio son obligatorios." },
                { status: 400 }
            );
        }

        // Insertar el producto en la base de datos
        const result = await pool.query(
            "INSERT INTO product (name, description, price) VALUES (?, ?, ?)",
            [name, description, price]
        );

        // Obtener `insertId` del resultado
        const insertId = (result as any).insertId; 

        // Retornar respuesta con el producto creado
        return NextResponse.json(
            {
                id: insertId,
                name,
                description,
                price,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error en POST /products:", error);
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    }
}

