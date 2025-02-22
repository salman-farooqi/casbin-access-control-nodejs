// src/controllers/policy.controller.js
import enforcer from '../config/casbin.js';
import * as PolicyModel from '../models/policy.model.js';
import logger from '../utils/logger.js';

/**
 * Adds a new policy.
 * Only admins should be allowed (check done in routes).
 */
export const addPolicy = async (req, res, next) => {
    try {
        const { subject, object, action } = req.body;
        if (!subject || !object || !action) {
            return res.status(400).json({ error: 'Missing policy fields' });
        }

        const added = await enforcer.addPolicy(subject, object, action);
        if (added) {
            await PolicyModel.createPolicy({ subject, object, action });
            return res.status(201).json({ message: 'Policy added successfully' });
        }

        return res.status(400).json({ error: 'Policy already exists or invalid' });
    } catch (err) {
        next(err);
    }
};

/**
 * Updates an existing policy.
 */
export const updatePolicy = async (req, res, next) => {
    try {
        const { oldPolicy, newPolicy } = req.body;
        if (!oldPolicy || !newPolicy) {
            return res.status(400).json({ error: 'Missing policy data' });
        }

        const removed = await enforcer.removePolicy(oldPolicy.subject, oldPolicy.object, oldPolicy.action);
        if (removed) {
            const added = await enforcer.addPolicy(newPolicy.subject, newPolicy.object, newPolicy.action);
            if (added) {
                await PolicyModel.updatePolicy(oldPolicy, newPolicy);
                return res.json({ message: 'Policy updated successfully' });
            }
            return res.status(400).json({ error: 'Failed to add new policy' });
        }
        return res.status(404).json({ error: 'Old policy not found' });
    } catch (err) {
        next(err);
    }
};

/**
 * Deletes a policy.
 */
export const deletePolicy = async (req, res, next) => {
    try {
        const { subject, object, action } = req.body;
        if (!subject || !object || !action) {
            return res.status(400).json({ error: 'Missing policy fields' });
        }

        const removed = await enforcer.removePolicy(subject, object, action);
        if (removed) {
            await PolicyModel.deletePolicy({ subject, object, action });
            return res.json({ message: 'Policy deleted successfully' });
        }
        return res.status(404).json({ error: 'Policy not found' });
    } catch (err) {
        next(err);
    }
};

/**
 * Synchronizes policies from the database to the enforcer.
 */
export const syncPolicies = async (req, res, next) => {
    try {
        const policies = await PolicyModel.getAllPolicies();
        // Clear current policies (simplified approach)
        enforcer.clearPolicy();
        for (const policy of policies) {
            await enforcer.addPolicy(policy.subject, policy.object, policy.action);
        }
        logger.info('Policies synchronized successfully.');
        res.json({ message: 'Policies synchronized successfully' });
    } catch (err) {
        next(err);
    }
};
