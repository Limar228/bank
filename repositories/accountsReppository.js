const pool = require("../config/pull");

const accountsRepository = {
  async postData(value, id_user) {
    const query = `
    UPDATE accounts 
    SET balance = balance + $1
    FROM cards 
    WHERE accounts.card_id = cards.id
      AND cards.number = $2
      AND cards.user_id = $3;
    `;

    const result = await pool.query(query, [
      value.amount,
      value.cardNumber,
      id_user,
    ]);
  },
  async transfer(data, id_user) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `UPDATE accounts 
    SET balance = balance - $1
    FROM cards 
    WHERE accounts.card_id = cards.id
      AND cards.number = $2
      AND cards.user_id = $3;
      `,
        [data.amount, data.myCards, id_user],
      );

      await client.query(
        `UPDATE accounts
      SET balance = balance + $1
      FROM cards
      WHERE accounts.card_id = cards.id
        AND cards.number = $2;`,
        [data.amount, data.recipient],
      );

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

module.exports = accountsRepository;
