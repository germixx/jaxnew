import mysql from 'mysql2/promise';

export async function connection2() {
    return await mysql.createConnection({
        host: process.env.DB_JAX_HOST,
        user: process.env.DB_JAX_USER,
        password: process.env.DB_JAX_PASSWORD,
        database: process.env.DB_JAX_DB,
    });
}
