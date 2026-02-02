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

module.exports = { createProject, getProjectsByOrg };
