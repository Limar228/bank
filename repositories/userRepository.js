const pool = require("../config/pull");
const { updateToken } = require("../service/serviceUsers");

const userRepository = {
  async create(param, verificationCode) {
    const query = `
      INSERT INTO temp_users (username, email, password, verification_code, verification_code_expires)
      VALUES ($1, $2, $3, $4, NOW() + INTERVAL '5 min');
    `;

    const result = await pool.query(query, [
      param.username,
      param.email,
      param.password,
      verificationCode,
    ]);
  },
  async getData(token) {
    const query = `
       SELECT username, balance, currency
       FROM users u
       LEFT JOIN accounts a ON u.id_user = a.user_id
    `;
    const result = await pool.query(query);
    if (!result.rows.length) {
      return null;
    }

    return result.rows[result.rows.length - 1];
  },
  async updateToken(token) {
    const query = `
       UPDATE users
       SET refresh = $1
       WHERE id_user = $2;
    `;
    const result = await pool.query(query, [
      token.refreshToken,
      token.id_users,
    ]);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[result.rows.length - 1];
  },
};

module.exports = userRepository;
