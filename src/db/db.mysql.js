import { createPool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = createPool({
    host: process.env.MYSQL_HOST || process.env.DB_HOST,
    user: process.env.MYSQL_USER || process.env.DB_USER,
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE || process.env.DB_DATABASE,
});

pool.on('connection', function (connection) {
    console.log('connected to the database...');
});

export default pool.promise();
