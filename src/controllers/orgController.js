const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const inviteUser = async (req, res) => {
  const { name, email, password } = req.body;
  const adminOrgId = req.user.org_id; // Get the Admin's Org ID from the token

  try {
    // 1. Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User (Force them into the Admin's Org, and set role to 'member')
    const newUser = await userModel.createUser(
      name,
      email,
      hashedPassword,
      "member",
      adminOrgId,
    );

    res.status(201).json({
      message: "User added to organization successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
        org_id: newUser.organization_id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { inviteUser };
