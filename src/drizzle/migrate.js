import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { DATABASE_URL } from './../config/env.js';

const migrationClient = postgres(DATABASE_URL, { max: 1 });

async function main() {
    try {
        console.log("Starting migration...");
        await migrate(drizzle(migrationClient), {
            migrationsFolder: "./src/drizzle/migrations",
        });
        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error.message);
        throw error;
    } finally {
        await migrationClient.end();
    }
}

main().catch((err) => {
    console.error("Error during migration ->", err);
    process.exit(1);
});

