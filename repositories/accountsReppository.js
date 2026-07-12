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
};

module.exports = accountsRepository;
