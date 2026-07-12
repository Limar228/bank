const pool = require("../config/pull");

const accountsRepository = {
  async createCards(card, numberCards, id_user) {
    console.log(card, numberCards, id_user);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const cardQuery = `
        INSERT INTO cards (name, type, number, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id; 
      `;

      const cardResult = await client.query(cardQuery, [
        card.name || "Электронная карта",
        card.type || "debit",
        numberCards,
        id_user,
      ]);

      const returnId = cardResult.rows[0].id;

      const accountQuery = `
        INSERT INTO accounts (balance, currency, card_id)
        VALUES ($1, $2, $3)
      `;

      const accountResult = await client.query(accountQuery, [
        0,
        "RUB",
        returnId,
      ]);

      await client.query("COMMIT");

      return cardResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Ошибка в транзакции создания счета и карты:", error);
    } finally {
      client.release();
    }
  },
  async getCards(id_user) {
    const query = `
    SELECT * 
    FROM cards c
    LEFT JOIN users u ON c.user_id = u.id_user
    WHERE u.id_user = $1
    `;

    const result = await pool.query(query, [id_user]);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[0];
  },
  async getCardsAccounts(id_user) {
    const query = `
    SELECT 
    a.id,
    c.name,
    c.type,
    c.number,
    a.balance
    FROM accounts a
    INNER JOIN cards c ON a.card_id = c.id
    WHERE c.user_id = $1
    `;

    const result = await pool.query(query, [id_user]);

    if (!result.rows.length) {
      return null;
    }

    return result.rows;
  },
};

module.exports = accountsRepository;
