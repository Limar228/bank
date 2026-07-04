const path = require("path");
const serviceUsers = require("../service/serviceUsers");
const serviceToken = require("../service/serviceToken");
const jwt = require("jsonwebtoken");

const authController = {
  async loginUsers(req, res) {
    const data = req.body;

    const userFromDB = await serviceUsers.loginUsers(data);

    if (userFromDB.success) {
      const payload = {
        id_user: userFromDB.users.id_user,
        username: userFromDB.users.username,
      };
      const privateKey = process.env.JWT_PRIVATE_KEY;

      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "30d",
      });
      const updateToken = await serviceToken.updateToken({
        refreshToken: refreshToken,
        id_users: userFromDB.users.id_user,
      });
      if (!updateToken.success) {
        return res.status(400).json({ message: updateToken.message });
      }

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Вы авторизованы",
      });
    } else {
      return res.status(400).json({ message: userFromDB.message });
    }
  },
};

module.exports = authController;
