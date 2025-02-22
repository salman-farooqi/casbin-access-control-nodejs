// src/routes/content.routes.js
import { Router } from 'express';
import { getContent } from '../controllers/content.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authorize, getContent);

export default router;
