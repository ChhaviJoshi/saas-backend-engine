const pool = require("../config/db");

const createOrganization = async (name) => {
  const result = await pool.query(
    "INSERT INTO organizations (name) VALUES ($1) RETURNING *",
    [name],
  );
  return result.rows[0];
};

module.exports = { createOrganization };
