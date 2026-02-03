const Joi = require("joi");

// 1. The Generic Validation Function
// This acts as a gatekeeper. If data is bad, it stops the request here.
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // Return a nice error message (e.g., "Password must be at least 6 characters")
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// 2. Define Rules for specific actions

// REGISTER: Ensure email is valid & password is strong
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // Force min 6 chars
  companyName: Joi.string().min(2).required(),
});

// LOGIN: Simple check
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// TASKS: Ensure status is one of the allowed words
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""), // Description can be empty
  projectId: Joi.number().integer().required(),
  assignedTo: Joi.number().integer().optional(),
  status: Joi.string().valid("todo", "in-progress", "done").optional(), // 👈 STRICT CHECK!
  priority: Joi.string().valid("low", "medium", "high").optional(),
});

module.exports = { validate, registerSchema, loginSchema, taskSchema };
