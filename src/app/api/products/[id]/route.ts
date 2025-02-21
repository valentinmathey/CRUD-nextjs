import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import { ResultSetHeader } from "mysql2/promise"; // Importamos ResultSetHeader para tipado

// ✅ Interfaz para los datos del producto
interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
}

// ✅ GET: Obtener un producto por ID
export async function GET(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const paths = url.pathname.split("/");
        const productId = Number(paths[paths.length - 1]);

        // Validar si el ID es un número
        if (isNaN(productId)) {
            return NextResponse.json({ message: "ID inválido" }, { status: 400 });
        }

        // Consulta a la base de datos
        const [result]: [Product[]] = await pool.query("SELECT * FROM product WHERE id = ?", [productId]);

        // Si no se encuentra el producto
        if (!result.length) {
            return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
        }

        return NextResponse.json(result[0]);

    } catch (error) {
        console.error("Error en API GET /products/[id]:", error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}

// ✅ PUT: Actualizar un producto por ID
export async function PUT(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const paths = url.pathname.split("/");
        const productId = Number(paths[paths.length - 1]);

        // Obtener datos a actualizar
        const data: Partial<Product> = await request.json();

        // Ejecutar la consulta de actualización
        const [result]: [ResultSetHeader] = await pool.query(
            "UPDATE product SET ? WHERE id = ?",
            [data, productId]
        );

        // Verificar si el producto se modificó correctamente
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
        }

        // Consultar el producto actualizado
        const [updatedProduct]: [Product[]] = await pool.query(
            "SELECT * FROM product WHERE id = ?",
            [productId]
        );

        return NextResponse.json(updatedProduct[0]);

    } catch (error) {
        console.error("Error en API PUT /products/[id]:", error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}

// ✅ DELETE: Eliminar un producto por ID
export async function DELETE(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const paths = url.pathname.split("/");
        const productId = Number(paths[paths.length - 1]);

        // Validar si el ID es un número
        if (isNaN(productId)) {
            return NextResponse.json({ message: "ID inválido" }, { status: 400 });
        }

        // Ejecutar la consulta de eliminación
        const [result]: [ResultSetHeader] = await pool.query(
            "DELETE FROM product WHERE id = ?",
            [productId]
        );

        // Verificar si el producto existía
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Producto eliminado correctamente" });

    } catch (error) {
        console.error("Error en API DELETE /products/[id]:", error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
