const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// REGISTRATION: Strong checks
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), 
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
  status: Joi.string().valid("todo", "in-progress", "done").optional(), 
  priority: Joi.string().valid("low", "medium", "high").optional(),
});

module.exports = { validate, registerSchema, loginSchema, taskSchema };
