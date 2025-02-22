import { defineConfig } from "drizzle-kit";

import { DATABASE_URL } from "./src/drizzle/db.js";

export default defineConfig({
    dialect: "postgresql",
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.js",
    dbCredentials: {
        url: DATABASE_URL,
    },
});

