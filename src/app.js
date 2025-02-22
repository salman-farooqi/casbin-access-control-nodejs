// src/app.js
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes.js';
import policyRoutes from './routes/policy.routes.js';
import contentRoutes from './routes/content.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Use JSON body parser middleware
app.use(bodyParser.json());

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/policies', policyRoutes);
app.use('/api/v1/content', contentRoutes);

// Global error handler (should be the last middleware)
app.use(errorHandler);

export default app;
