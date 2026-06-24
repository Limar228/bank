const pool = require("../config/pull");

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
};

module.exports = userRepository;
