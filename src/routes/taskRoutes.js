const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middlewares/authMiddleware");

// All routes require login
router.post("/", authenticateToken, taskController.createTask);
router.get("/:projectId", authenticateToken, taskController.getTasks);
router.patch("/:id/status", authenticateToken, taskController.updateStatus); // PATCH is used for partial updates

module.exports = router;
