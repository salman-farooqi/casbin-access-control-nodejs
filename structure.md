/project-root
├── package.json
├── .env
├── model.conf               # Casbin model file
├── policy.csv               # Initial Casbin policy file
└── src
    ├── app.js               # Express app configuration (mounts middleware & routes)
    ├── server.js            # Entry point to start the server
    ├── config
    │   ├── casbin.js        # Casbin enforcer setup
    │   ├── db.js            # PostgreSQL & DrizzleORM connection
    │   └── env.js           # Loads environment variables (using dotenv)
    ├── controllers
    │   ├── auth.controller.js
    │   ├── content.controller.js
    │   └── policy.controller.js
    ├── middleware
    │   ├── auth.middleware.js   # Authentication/authorization middleware
    │   └── error.middleware.js  # Global error handling middleware
    ├── models
    │   ├── user.model.js        # User model queries (DrizzleORM)
    │   └── policy.model.js      # Policy model queries (DrizzleORM)
    ├── routes
    │   ├── auth.routes.js
    │   ├── content.routes.js
    │   └── policy.routes.js
    └── utils
        └── logger.js            # Logging utility
