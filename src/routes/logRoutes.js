const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");
const authenticateToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router.get("/", authenticateToken, checkRole("admin"), logController.getLogs);

module.exports = router;
