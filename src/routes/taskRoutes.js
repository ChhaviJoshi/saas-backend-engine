const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middlewares/authMiddleware");
// 👇 Import validation
const { validate, taskSchema } = require("../middlewares/validationMiddleware");

// Add validation to the Create route
router.post(
  "/",
  authenticateToken,
  validate(taskSchema),
  taskController.createTask,
);
router.get("/:projectId", authenticateToken, taskController.getTasks);
router.patch("/:id/status", authenticateToken, taskController.updateStatus);

module.exports = router;
