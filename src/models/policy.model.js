// src/models/policy.model.js
import db from './../drizzle/db.js';

const POLICIES_TABLE = 'policies';

/**
 * Inserts a new policy into the database.
 * @param {Object} policy - The policy object { subject, object, action }
 */
export const createPolicy = async (policy) => {
    await db.insertInto(POLICIES_TABLE).values(policy).execute();
};

/**
 * Updates an existing policy.
 * @param {Object} oldPolicy - The policy to update.
 * @param {Object} newPolicy - The new policy values.
 */
export const updatePolicy = async (oldPolicy, newPolicy) => {
    await db.update(POLICIES_TABLE).set(newPolicy).where(oldPolicy).execute();
};

/**
 * Deletes a policy from the database.
 * @param {Object} policy - The policy object { subject, object, action }
 */
export const deletePolicy = async (policy) => {
    await db.deleteFrom(POLICIES_TABLE).where(policy).execute();
};

/**
 * Retrieves all policies.
 * @returns {Array} - List of policy objects.
 */
export const getAllPolicies = async () => {
    return await db.select().from(POLICIES_TABLE).execute();
};
