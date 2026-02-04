const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middlewares/authMiddleware");
const { validate, taskSchema } = require("../middlewares/validationMiddleware");

router.post(
  "/",
  authenticateToken,
  validate(taskSchema),
  taskController.createTask,
);
router.get("/:projectId", authenticateToken, taskController.getTasks);
router.patch("/:id/status", authenticateToken, taskController.updateStatus);

module.exports = router;
