const accountsRepository = require("../repositories/accountsReppository");

const accounts = {
  async updateAccounts(valueOfReplenish, id_user) {
    const valueOfBase = await accountsRepository.postData(
      valueOfReplenish,
      id_user,
    );
  },
  async transfer(data, id_user) {
    const valueOfBase = await accountsRepository.transfer(data, id_user);
  },
};

module.exports = accounts;
