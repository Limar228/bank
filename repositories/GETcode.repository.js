const pool = require("../config/pull");

const getRepository = {
  async getCode(email) {
    const query = `
      SELECT verification_code
      FROM users
      WHERE email = $1
    `;

    const result = await pool.query(query, [email]);
    if (!result.rows.length) {
      return null;
    }

    return result.rows[result.rows.length - 1];
  },
};

module.exports = getRepository;
