const pool = require("../config/pull");

const userRepository = {
  async create(param, verificationCode) {
    const query = `
      INSERT INTO users (username, email, password, verification_code, verification_code_expires)
      VALUES ($1, $2, $3, $4, NOW() + INTERVAL '15 minutes') 
      RETURNING id_user, username, email;
    `;

    const result = await pool.query(query, [
      param.username,
      param.email,
      param.password,
      verificationCode,
    ]);

    return result.rows[0]; // ДЛЯ СЛЕД ДЕЙСТВИЙ С ЭТИМ ПОЛЬЗОВАТЕЛЕМ СЕССИИ ИЛИ JWT токен
  },
};

module.exports = userRepository;
