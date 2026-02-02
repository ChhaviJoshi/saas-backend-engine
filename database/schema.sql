-- 1. Organizations (The Tenants)
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (Belong to an Organization)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'member', -- 'admin' or 'member'
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects (Scoped to an Organization)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'archived'
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tasks (Scoped to a Project)
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo', -- 'todo', 'in-progress', 'done'
    priority VARCHAR(50) DEFAULT 'medium', -- 'low', 'medium', 'high'
    due_date TIMESTAMP,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL, -- User must belong to same Org
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE, -- Double verification!
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Activity Logs (Audit Trail)
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    action TEXT NOT NULL, -- e.g., "User X created Project Y"
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);