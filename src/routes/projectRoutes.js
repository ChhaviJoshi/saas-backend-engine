const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authenticateToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

// Create: Protected (Admin Only)
router.post(
  "/",
  authenticateToken,
  checkRole("admin"),
  projectController.createProject,
);

// View: Protected (Any Member of the Org)
router.get("/", authenticateToken, projectController.getAllProjects);

router.patch(
  "/:id/status",
  authenticateToken,
  checkRole("admin"),
  projectController.updateStatus,
);

// Delete (Admin only - MANDATORY Requirement)
router.delete(
  "/:id",
  authenticateToken,
  checkRole("admin"),
  projectController.deleteProject,
);

module.exports = router;
