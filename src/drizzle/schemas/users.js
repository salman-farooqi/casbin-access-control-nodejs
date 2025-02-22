// src/schemas/users.js
import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    boolean,
    compositeKey,
} from "drizzle-orm/pg-core";
import { RolesTable } from "./roles";
import { TenantsTable } from "./tenants";

// Users Table
export const UsersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    roleId: uuid("role_id").references(() => RolesTable.id).notNull(),
    tenantId: uuid("tenant_id").references(() => TenantsTable.id).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    username: varchar("username", { length: 18 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }),
    contactNumber: varchar("contact_number", { length: 50 }),
    address: varchar("address", { length: 255 }),
    isVerified: boolean("is_Verified").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
}, {
    indexes: {
        email_idx: "email",
        username_idx: "username",
    },
    key: compositeKey("email", "username"),
});

