import dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg'

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

client.connect();