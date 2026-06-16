const path = require("path");

const pageController = {
  async html(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "reg.html"));
  },
};

module.exports = pageController;
