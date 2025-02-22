// src/routes/policy.routes.js
import { Router } from 'express';
import { addPolicy, updatePolicy, deletePolicy, syncPolicies } from '../controllers/policy.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = Router();

// All routes here are protected by the authorization middleware.
router.post('/', authorize, addPolicy);
router.put('/', authorize, updatePolicy);
router.delete('/', authorize, deletePolicy);
router.post('/sync', authorize, syncPolicies);

export default router;
