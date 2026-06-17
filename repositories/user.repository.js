const pool = require("../config/pull");

const userRepository = {
  async create(param) {
    const query = `
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id_user, username, email, password;
    `;

    const result = await pool.query(query, [
      param.username,
      param.email,
      param.password,
    ]);
    console.log("результат бд НАЧ", result, "\nКОН");

    return result.rows[0]; // ДЛЯ СЛЕД ДЕЙСТВИЙ С ЭТИМ ПОЛЬЗОВАТЕЛЕМ СЕССИИ ИЛИ JWT токен
  },
};

module.exports = userRepository;
