const pool = require("../config/pull");

const getRepository = {
  async getCode(email) {
    const query = `
      SELECT verification_code, verification_code_expires 
      FROM temp_users
      WHERE email = $1
    `;

    const result = await pool.query(query, [email]);
    if (!result.rows.length) {
      return null;
    }

    return result.rows[result.rows.length - 1];
  },

  async transactionUsers(email) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO users (username, email, password) 
        SELECT username, email, password
        FROM temp_users
        WHERE email = $1
        ORDER BY id_user DESC
        LIMIT 1 
        RETURNING id_user, email`,
        [email],
      );

      await client.query("DELETE FROM temp_users WHERE email = $1", [email]);

      await client.query("COMMIT");
      return result.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      console.log(err);
    } finally {
      client.release();
    }
  },
};

module.exports = getRepository;
