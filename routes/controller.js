const path = require("path");
const serviceSessions = require("../service/serviceSessions");
const serviceUsers = require("../service/serviceUsers");
const serviceVerification = require("../service/serviceVerification");

class Route {
  async postUsers(req, res) {
    const data = req.body;
    console.log(data);

    try {
      await serviceVerification({ userEmail: data.email }); //Дэф функция теперь при эксп, ожид обьект
      await serviceUsers.writeUsersFs(data);
      res.sendFile(path.join(__dirname, "..", "public", "confirm.html"));
    } catch (error) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА В РОУТЕ:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async html(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "reg.html"));
  }

  async confirm(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "confirm.html"));
  }

  async loginUsers(req, res) {
    const { username, password } = req.body; // СОЗДАТЬ HTML ФОРМА ДЛЯ ЛОГИНА

    try {
      await serviceSessions.setSession(username, password);
      res.status(200).json({ message: "Успешный вход!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new Route();
