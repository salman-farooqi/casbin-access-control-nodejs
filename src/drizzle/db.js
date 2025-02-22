// src/drizzle/db.js
import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_URL } from './../config/env.js';

const { Client } = pkg;

// Create a new PostgreSQL client instance
const pgClient = new Client({ connectionString: DATABASE_URL });
await pgClient.connect();

// Initialize DrizzleORM with the connected client
const db = drizzle(pgClient);

console.log('Successfully connected to database!');

export default db;

