const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const rateLimit = require("express-rate-limit"); // (You likely added this earlier)

const {
  validate,
  registerSchema,
  loginSchema,
} = require("../middlewares/validationMiddleware");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
