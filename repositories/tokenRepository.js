const pool = require("../config/pull");

const tokenRepository = {
  async getRefresh(id_users) {
    const query = `
      SELECT refresh FROM users
      WHERE id_user = $1 
    `;

    const result = await pool.query(query, [id_users]);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[0];
  },
};

module.exports = tokenRepository;
