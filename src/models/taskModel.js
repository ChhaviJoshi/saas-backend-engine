const pool = require("../config/db");

// Create Task
const createTask = async (title, description, projectId, assignedTo, orgId) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, project_id, assigned_to, organization_id) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, projectId, assignedTo, orgId],
  );
  return result.rows[0];
};

// Get Tasks with Pagination
const getTasksByProject = async (projectId, orgId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit; 

  const result = await pool.query(
    `SELECT t.*, u.name as assignee_name 
     FROM tasks t 
     LEFT JOIN users u ON t.assigned_to = u.id 
     WHERE t.project_id = $1 AND t.organization_id = $2
     ORDER BY t.created_at DESC
     LIMIT $3 OFFSET $4`,
    [projectId, orgId, limit, offset]
  );
  return result.rows;
};

// Update Task Status (e.g., moving from 'Todo' to 'Done')
const updateTaskStatus = async (taskId, status, orgId) => {
  const result = await pool.query(
    `UPDATE tasks SET status = $1 
     WHERE id = $2 AND organization_id = $3 RETURNING *`,
    [status, taskId, orgId],
  );
  return result.rows[0];
};

module.exports = { createTask, getTasksByProject, updateTaskStatus };
