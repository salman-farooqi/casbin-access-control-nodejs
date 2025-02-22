// src/schemas/roles.js
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

// DrizzleORM table definition for 'RolesTable'
export const RolesTable = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
});
