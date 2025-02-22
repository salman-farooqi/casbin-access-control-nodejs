// src/utils/logger.js
const logger = {
    info: (msg, ...args) => console.log(`INFO: ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`WARN: ${msg}`, ...args),
    error: (msg, ...args) => console.error(`ERROR: ${msg}`, ...args)
};

export default logger;
