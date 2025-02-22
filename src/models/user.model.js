// src/models/user.model.js
import db from './../drizzle/db.js';

import { UsersTable } from "./../drizzle/schema.js";

/**
 * Inserts a new user into the database.
 * @param {Object} user - The user object { username, passwordHash, roleId, tenantId }
 */
export const createUser = async (user) => {
  await db.insert(UsersTable).values(user).execute();
};

/**
 * Finds a user by username.
 * @param {string} username
 * @returns {Object|null} - The user object or null if not found.
 */
export const findUserByUsername = async (username) => {
  const [user] = await db.select().from(UsersTable).where({ username }).limit(1).execute();
  return user || null;
};
