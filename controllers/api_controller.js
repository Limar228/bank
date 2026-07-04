const path = require("path");
const usersService = require("../service/serviceUsers");
// const { access } = require("fs");

const users = {
  async getUserData(req, res) {
    const jwt = req.cookies.accessToken;

    if (!jwt) {
      return res
        .status(401)
        .json({ message: "Время действия сессии истекло." });
    }
    const data = await usersService.getUsers(jwt);

    res.status(200).json({ users: data });
  },
  async loggout(req, res) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Вы вышли" });
  },
};

module.exports = users;
