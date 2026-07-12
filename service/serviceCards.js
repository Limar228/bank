const cardsRepository = require("../repositories/cardsReppository");

const cards = {
  async createCards(card, id_user) {
    const numberCards = cards.generateRandomCardNumber();
    await cardsRepository.createCards(card, numberCards, id_user);
  },
  async getCards(id_user) {
    const data = await cardsRepository.getCardsAccounts(id_user);

    return data;
  },

  generateRandomCardNumber() {
    let result = "";
    for (let i = 0; i < 4; i++) {
      const chunk = Math.floor(1000 + Math.random() * 9000);
      result += chunk + (i < 3 ? " " : "");
    }
    return result;
  },
};

module.exports = cards;
