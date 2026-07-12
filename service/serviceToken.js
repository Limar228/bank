const jwt = require("jsonwebtoken");
const tokenRepository = require("../repositories/tokenRepository");
const userRepository = require("../repositories/userRepository");
// const jwt = require("jsonwebtoken");

const users = {
  async updateToken(token) {
    try {
      await userRepository.updateToken(token);
      return {
        success: true,
      };
    } catch (error) {
      // return {
      //   success: false,
      //   message: error,
      // };
      console.log(error);
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
      // return {
      //   success: false,
      //   message: error,
      // };
      console.log(error);
    }
  },
  async checkingTokens(access, refresh) {
    const decoded = jwt.verify(refresh, process.env.JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    const dbToken = await users.getRefresh(decoded.id_user);

    if (refresh === dbToken.token.refresh) {
      const accessToken = jwt.sign(
        { id_user: decoded.id_user, username: decoded.username },
        process.env.JWT_PRIVATE_KEY,
        {
          algorithm: "RS256",
          expiresIn: "15m",
        },
      );
      const refreshToken = jwt.sign(
        { id_user: decoded.id_user, username: decoded.username },
        process.env.JWT_PRIVATE_KEY,
        { algorithm: "RS256", expiresIn: "30d" },
      );

      await users.updateToken({
        refreshToken: refreshToken,
        id_users: decoded.id_user,
      });

      return { accessToken: accessToken, refreshToken: refreshToken };
    }
  },
};
module.exports = users;
