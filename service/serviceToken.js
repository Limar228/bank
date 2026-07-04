const jwt = require("jsonwebtoken");
const tokenRepository = require("../repositories/tokenRepository");
const userRepository = require("../repositories/userRepository");

const users = {
  async updateToken(token) {
    try {
      await userRepository.updateToken(token);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  },
  async getRefresh(id_users) {
    try {
      const token = await tokenRepository.getRefresh(id_users);
      return {
        success: true,
        token: token,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  },
};
module.exports = users;
