const pool = require("../db/index");

const createUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createUser,
};
