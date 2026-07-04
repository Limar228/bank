const pool = require("../config/pull");

const userRepository = {
  async getUsers(param) {
    const query = `
      SELECT * FROM users
      WHERE email = $1 
      ORDER BY email DESC
    `;

    const result = await pool.query(query, [param.email]);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[0];
  },
};

module.exports = userRepository;
