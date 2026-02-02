const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const orgModel = require("../models/orgModel");
const userModel = require("../models/userModel");

// 1. Register: Creates Org + Admin User
const register = async (req, res) => {
  const { name, email, password, companyName } = req.body;

  try {
    // A. Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // B. Create the Organization First (We need the org_id)
    const newOrg = await orgModel.createOrganization(companyName);
    const orgId = newOrg.id;

    // C. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // D. Create the User (Linked to the new Org ID)
    const newUser = await userModel.createUser(
      name,
      email,
      hashedPassword,
      "admin",
      orgId,
    );

    // E. Generate Token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, org_id: orgId }, // 👈 Crucial: We put org_id in the token!
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res
      .status(201)
      .json({
        message: "Registered successfully",
        token,
        user: newUser,
        org: newOrg,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 2. Login (Standard)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, org_id: user.organization_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
