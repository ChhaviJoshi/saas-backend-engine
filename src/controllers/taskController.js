const taskModel = require("../models/taskModel");
const logModel = require("../models/logModel");
const pool = require("../config/db"); // for a quick user check

const createTask = async (req, res) => {
  const { title, description, projectId, assignedTo } = req.body;
  const orgId = req.user.org_id;
  const userId = req.user.id;

  try {
    if (assignedTo) {
      const userCheck = await pool.query(
        "SELECT organization_id FROM users WHERE id = $1",
        [assignedTo],
      );
      if (
        userCheck.rows.length === 0 ||
        userCheck.rows[0].organization_id !== orgId
      ) {
        return res
          .status(403)
          .json({
            error: "Cannot assign task to user from another organization!",
          });
      }
    }

    const newTask = await taskModel.createTask(
      title,
      description,
      projectId,
      assignedTo,
      orgId,
    );
    await logModel.createLog(`Created task "${title}"`, userId, orgId);
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getTasks = async (req, res) => {
  const { projectId } = req.params;
  const orgId = req.user.org_id;

  // Read query params (default to Page 1, Limit 10)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const tasks = await taskModel.getTasksByProject(
      projectId,
      orgId,
      page,
      limit,
    );
    res.json({ page, limit, tasks }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params; // Task ID
  const { status } = req.body; // New Status
  const orgId = req.user.org_id;
  const userId = req.user.id;

  try {
    const updatedTask = await taskModel.updateTaskStatus(id, status, orgId);
    if (!updatedTask)
      return res.status(404).json({ error: "Task not found or access denied" });
    await logModel.createLog(
      `Updated task ${id} status to "${status}"`,
      userId,
      orgId,
    );
    res.json({ message: "Status updated", task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createTask, getTasks, updateStatus };
