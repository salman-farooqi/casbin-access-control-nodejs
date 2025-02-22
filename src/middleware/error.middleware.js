// src/middleware/error.middleware.js
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`, err);
    res.status(500).json({ error: 'Internal Server Error' });
};
