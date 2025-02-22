// src/schemas/policies.js
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { RolesTable } from './roles';

// DrizzleORM table definition for 'PoliciesTable' table
export const PoliciesTable = pgTable('policies', {
    id: uuid("id").primaryKey().defaultRandom(),
    roleId: uuid("role_id").references(() => RolesTable.id).notNull(),
    object: varchar('object', { length: 255 }).notNull(),
    action: varchar('action', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
});
