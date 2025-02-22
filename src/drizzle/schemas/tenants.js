// src/schemas/tenants.js
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

// DrizzleORM table definition for 'TenantsTable'
export const TenantsTable = pgTable('tenants', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
});
