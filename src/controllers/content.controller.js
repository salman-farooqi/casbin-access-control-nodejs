// src/controllers/content.controller.js

/**
 * Returns protected content.
 */
export const getContent = async (req, res, next) => {
    try {
        // In a real CMS, this would query content for the tenant/user.
        res.json({ message: 'Access granted to protected content.' });
    } catch (err) {
        next(err);
    }
};
