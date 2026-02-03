const pool = require("../config/db");

// 1. Create a Project (Linked to an Org)
const createProject = async (name, description, orgId) => {
  const result = await pool.query(
    "INSERT INTO projects (name, description, organization_id) VALUES ($1, $2, $3) RETURNING *",
    [name, description, orgId],
  );
  return result.rows[0];
};

// 2. Get All Projects for a specific Org
const getProjectsByOrg = async (orgId) => {
  const result = await pool.query(
    "SELECT * FROM projects WHERE organization_id = $1 ORDER BY created_at DESC",
    [orgId],
  );
  return result.rows;
};

// ... existing createProject and getProjectsByOrg code ...

// 3. Update Project Status
const updateProjectStatus = async (id, status, orgId) => {
  const result = await pool.query(
    'UPDATE projects SET status = $1 WHERE id = $2 AND organization_id = $3 RETURNING *',
    [status, id, orgId]
  );
  return result.rows[0];
};

// 4. Delete Project
const deleteProject = async (id, orgId) => {
  const result = await pool.query(
    'DELETE FROM projects WHERE id = $1 AND organization_id = $2 RETURNING *',
    [id, orgId]
  );
  return result.rows[0];
};

module.exports = { createProject, getProjectsByOrg, updateProjectStatus, deleteProject };
