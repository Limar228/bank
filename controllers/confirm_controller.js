const path = require("path");

const pageController = {
  async confirm(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "confirm.html"));
  },
};

module.exports = pageController;
