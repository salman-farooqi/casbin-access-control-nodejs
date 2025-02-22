// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Registers a new user.
 */
export const register = async (req, res, next) => {
    try {
        const { username, password, role, tenantId } = req.body;
        if (!username || !password || !role || !tenantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await createUser({ username, passwordHash, role, tenantId });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
};

/**
 * Logs in a user and returns a JWT token.
 */
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await findUserByUsername(username);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, username, role: user.role, tenantId: user.tenantId },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        next(err);
    }
};
