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
};

module.exports = pageController;
