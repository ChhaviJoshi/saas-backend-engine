const pool = require("../config/db");

// Create a Log Entry
const createLog = async (action, userId, orgId) => {
  await pool.query(
    "INSERT INTO activity_logs (action, user_id, organization_id) VALUES ($1, $2, $3)",
    [action, userId, orgId],
  );
};

// Get Logs for an Organization (Most recent first)
const getLogsByOrg = async (orgId) => {
  const result = await pool.query(
    `SELECT l.action, l.created_at, u.name as user_name 
     FROM activity_logs l
     JOIN users u ON l.user_id = u.id
     WHERE l.organization_id = $1
     ORDER BY l.created_at DESC`,
    [orgId],
  );
  return result.rows;
};

module.exports = { createLog, getLogsByOrg };
