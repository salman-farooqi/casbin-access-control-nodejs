// src/config/casbin.js
import { newEnforcer } from 'casbin';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Casbin enforcer
const enforcer = await newEnforcer(
    path.join(__dirname, '../../model.conf'),
    path.join(__dirname, '../../policy.csv')
);

export default enforcer;
