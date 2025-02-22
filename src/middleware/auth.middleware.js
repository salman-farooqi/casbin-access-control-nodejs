// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import enforcer from '../config/casbin.js';
import { JWT_SECRET } from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Extracts user information from the Authorization header (Bearer token).
 */
export const extractUser = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

/**
 * Express middleware to enforce authorization using Casbin.
 */
export const authorize = async (req, res, next) => {
    const user = extractUser(req);
    if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const resource = req.baseUrl + req.path; // Consider full route path
    const action = req.method;

    logger.info(`Auth check: User ${user.username} (${user.role}) requesting ${action} ${resource}`);

    try {
        const allowed = await enforcer.enforce(user.role, resource, action);
        if (allowed) {
            next();
        } else {
            logger.warn(`Unauthorized: ${user.username} (${user.role}) for ${action} ${resource}`);
            return res.status(403).json({ error: 'Access Denied' });
        }
    } catch (err) {
        next(err);
    }
};
