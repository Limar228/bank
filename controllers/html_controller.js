const path = require("path");

const pageController = {
  async reg(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "reg.html"));
  },
  async login(req, res) {
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
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
  },
  async confirm(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "confirm.html"));
  },
  async dashboard(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "dashboard.html"));
  },
  async replenish(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "replenish.html"));
  },
  async cards(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "cards.html"));
  },
  async newCards(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "newCards.html"));
  },
};

module.exports = pageController;
