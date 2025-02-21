import { NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise"; // Importamos ResultSetHeader para tipado
import pool from "@/libs/db";

// ✅ Interfaz para los datos del producto
interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    createAt?: string;
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
        const result: [Product[]] = await pool.query("SELECT * FROM product WHERE id = ?", [productId]);

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
export async function PUT(request: Request): Promise<Response> {
    try {
        // 🔹 Extraer el ID del producto desde la URL
        const url = new URL(request.url);
        const paths = url.pathname.split("/");
        const productId = Number(paths[paths.length - 1]);

        // 🔹 Validar que el ID sea un número válido
        if (isNaN(productId)) {
            return NextResponse.json({ message: "ID inválido" }, { status: 400 });
        }

        // 🔹 Obtener los datos enviados en la solicitud
        const data: Partial<Product> = await request.json();

        // 🔹 Verificar que haya al menos un campo para actualizar
        if (!Object.keys(data).length) {
            return NextResponse.json({ message: "No hay datos para actualizar" }, { status: 400 });
        }

        // 🔹 Excluir `createAt` de la actualización
        const fields = Object.keys(data)
            .filter((key) => key !== "createAt")
            .map((key) => `${key} = ?`)
            .join(", ");

        // 🔹 Obtener los valores de los campos a actualizar (excluyendo `createAt`)
        const values = Object.entries(data)
            .filter(([key]) => key !== "createAt")
            .map(([, value]) => value);

        // 🔹 Si no hay campos válidos para actualizar, retornar error
        if (!fields.length) {
            return NextResponse.json({ message: "Nada que actualizar" }, { status: 400 });
        }

        // 🔹 Ejecutar la consulta `UPDATE` en la base de datos
        const result: [ResultSetHeader] = await pool.query(
            `UPDATE product SET ${fields} WHERE id = ?`,
            [...values, productId]
        );

        // 🔹 Consultar el producto actualizado
        const [updatedProduct]: [RowDataPacket[]] = await pool.query(
            "SELECT * FROM product WHERE id = ?",
            [productId]
        );

        // 🔹 Devolver el producto actualizado o un objeto vacío si no se encuentra
        return NextResponse.json(updatedProduct[0] || {});

    } catch (error) {
        console.error("Error en API PUT /products/[id]:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
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
        const result: [ResultSetHeader] = await pool.query(
            "DELETE FROM product WHERE id = ?",
            [productId]
        );

        return NextResponse.json({ message: "Producto eliminado correctamente" });

    } catch (error) {
        console.error("Error en API DELETE /products/[id]:", error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
