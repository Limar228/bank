const accountsRepository = require("../repositories/accountsReppository");

const accounts = {
  async updateAccounts(valueOfReplenish, id_user) {
    const valueOfBase = await accountsRepository.postData(
      valueOfReplenish,
      id_user,
    );
  },
};

module.exports = accounts;
