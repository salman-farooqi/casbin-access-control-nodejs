# File Structure
/project-root
├── drizzle.config.js        # Drizzle config file
├── eslint.config.js         # ESLint config file
├── .gitignore               # Git ignore file
├── .README.md               # README file
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
    ├── drizzle
    │   ├── migrations       # Migration files for the database
    │   └── schemas          # Schemas for various database tables
    │   ├── db.js            # DrizzleORM connection
    │   ├── migrate.js       # Migrates the database using DrizzleORM
    │   ├── schema.js        # DrizzleORM schema definition
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


# flowchart TD
    A[Client (Browser/Postman)]
    B[Express.js Server]
    C[Authentication & Authorization Middleware]
    D[Business Logic / Controllers]
    E[DrizzleORM Data Access Layer]
    F[PostgreSQL Database]
    G[Audit & Logging]

    A --> B
    B --> C
    C -- Authorized? -->|Yes| D
    C -- Unauthorized -->|No| H[Error Response]
    D --> E
    E --> F
    D --- G
    C --- G

Key Integration Points:

    Casbin Middleware: Intercepts requests, extracts user context, and performs policy evaluation.
    DrizzleORM Layer: Reads/writes users, roles, and policy rules stored in PostgreSQL.
    Policy Synchronization: When policies are updated via API endpoints, the enforcer cache is refreshed to reflect new rules.

------------------------------------------------------------------------------------------------------------------------

# Authentication & Authorization Middleware
function authorizationMiddleware(request, response, next):
    // Extract user info from request (e.g., via JWT or session)
    user = extractUserFromRequest(request)
    
    // Determine the resource and action based on the request
    resource = request.path
    action = request.method
    
    // Use Casbin enforcer to check if the user (or their role) is allowed
    if casbinEnforcer.enforce(user.role, resource, action):
        next()  // User is authorized; proceed to controller
    else:
        logUnauthorizedAttempt(user, resource, action)
        response.status(403).send("Access Denied")

For policy synchronization, when policies are added/updated/deleted through the API, call a function to reload policies in the enforcer cache.

----------------------------------------------------------------------------------------------------------------

# Database Schema
┌────────────┐          ┌─────────────┐
│  tenants   │          │    roles    │
│------------│          │-------------│
│ id (PK)    │◄───────┐ │ id (PK)     │
│ name       │        │ │ name        │
│ created_at │        │ │ created_at  │
│ updated_at │        │ │ updated_at  │
└────────────┘        │ └─────────────┘
                      │
                      │
                      ▼
                 ┌────────────┐
                 │   users    │
                 │------------│
                 │ id (PK)    │
                 │ username   │
                 │ password_hash
                 │ role_id (FK -> roles.id)
                 │ tenant_id (FK -> tenants.id)
                 │ created_at
                 │ updated_at
                 └────────────┘

          ┌─────────────────────────────────┐
          │             policies           │
          │--------------------------------│
          │ id (PK)                        │
          │ role_id (FK -> roles.id)       │  <-- 'subject' in Casbin terms
          │ object (string)                │
          │ action (string)                │
          │ created_at                     │
          │ updated_at                     │
          └─────────────────────────────────┘

Notes:
    tenants: Each tenant (organization) has an ID, name, and timestamps.
    roles: Stores role metadata (like admin, editor, viewer) and timestamps.
    users: Each user references a single role (if you need multiple roles per user, you’d create a user_roles pivot table) and a single tenant.
    policies: Each policy row references a role (subject) and specifies the allowed object and action.
        In Casbin terms, subject = role_id, object = object, action = action.

----------------------------------------------------------------------------------------------------------------

# Extras
# Policy                                    # department            User            resource path           Action      Auth Effect
p, csr, /dashboard, GET                     marketing               csr             /dashboard              GET         allow
p, csr, /all-customers, GET
p, csr, /lead, POST
p, csr, /specific-leads, GET
p, csr, /complaint, POST
p, csr, /complaint, GET