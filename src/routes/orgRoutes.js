const express = require("express");
const router = express.Router();
const orgController = require("../controllers/orgController");
const authenticateToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

// Only an Authenticated Admin can hit this route
router.post(
  "/invite",
  authenticateToken,
  checkRole("admin"),
  orgController.inviteUser,
);

module.exports = router;
