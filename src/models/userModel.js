const pool = require("../config/db");

const createUser = async (name, email, password, role, orgId) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role, organization_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, password, role, orgId],
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
