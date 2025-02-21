import mysql from "serverless-mysql";

// Función para obtener variables de entorno con validación
const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Falta la variable de entorno: ${key}`);
    }
    return value;
};

// Configuración de la base de datos con variables de entorno
const dbConfig = {
    host: getEnv("DATABASE_HOST"),
    user: getEnv("DATABASE_USER"),
    password: getEnv("DATABASE_PASSWORD"),
    port: Number(getEnv("DATABASE_PORT")),
    database: getEnv("DATABASE_NAME"),
};

// Crear conexión a la base de datos con `serverless-mysql`
export const pool = mysql({ config: dbConfig });
