const path = require("path");
const usersService = require("../service/serviceUsers");
const usersAccounts = require("../service/serviceAccounts");
const usersCards = require("../service/serviceCards");
const { createCards } = require("../repositories/cardsReppository");
const { log } = require("console");

const users = {
  async getUserData(req, res) {
    const data = await usersService.getUsers(req.user);

    return res.status(200).json({ users: data });
  },
  // async loggout(req, res) {
  //   res.clearCookie("accessToken", {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "Strict",
  //   });
  //   res.clearCookie("refreshToken", {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "Strict",
  //   });
  //   res.sendFile();
  // },
  async updateUser(req, res) {
    const valueOfReplenish = req.body;

    const data = await usersAccounts.updateAccounts(
      valueOfReplenish,
      req.user.id_user,
    );

    res.status(200).json({ message: "ok" });
  },
  async getCards(req, res) {
    const dataCards = await usersCards.getCards(req.user.id_user);

    res.status(200).json({ message: "allgood", dataCards: dataCards });
  },
  async createCards(req, res) {
    const dataCards = await usersCards.createCards(req.body, req.user.id_user);
    res.status(200).json({ message: "ok" });
  },
};

module.exports = users;
