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
  async getData(user) {
    const query = `
       SELECT username, SUM(balance) as balance, currency
FROM cards
LEFT JOIN accounts ON accounts.card_id = cards.id
LEFT JOIN users ON users.id_user = cards.user_id
WHERE users.id_user = $1
GROUP BY users.username, accounts.currency;
    `;
    const result = await pool.query(query, [user.id_user]);

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
