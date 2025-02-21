import mysql from "serverless-mysql";

// ✅ Función para obtener variables de entorno con validación
const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        console.error(`⚠️ Falta la variable de entorno: ${key}`);
        throw new Error(`Falta la variable de entorno: ${key}`);
    }
    return value;
};

// ✅ Configuración de la base de datos
const pool = mysql({
    config: {
        host: getEnv("DATABASE_HOST", "crossover.proxy.rlwy.net"),
        user: getEnv("DATABASE_USER", "root"),
        password: getEnv("DATABASE_PASSWORD", "fQmYcxujYJEqNWjMsDfRirMTJVpfsxQb"),
        port: Number(getEnv("DATABASE_PORT", "58911")),
        database: getEnv("DATABASE_NAME", "railway"),
    },
});

// ✅ Función para ejecutar consultas SQL
export async function query(sql, values) {
    try {
        console.log(`📌 Ejecutando SQL: ${sql}`, values || "");
        const results = await pool.query(sql, values);
        await pool.end();
        return results;
    } catch (error) {
        console.error("❌ Error en la base de datos:", error);
        throw error;
    }
}

export default pool;
