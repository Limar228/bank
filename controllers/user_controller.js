const path = require("path");
const serviceUsers = require("../service/serviceUsers");
const serviceVerification = require("../service/serviceVerification");
const serviceSessions = require("../service/serviceSessions");

const authController = {
  async postUsers(req, res) {
    const data = req.body;
    console.log(data);

    try {
      const ret = await serviceVerification.sendVerificationCode(data.email); // НУЖНО ПРОВЕРЯТЬ КОД
      // if (ret) {

      // } else {
      //   console.log("controller", ret);
      //   throw new Error();
      // }  ПРИ ВВОДЕ НЕПРАВИЛЬНОЙ ИЛИ ПРАВИЛЬНОЙ ПОЧТЫ ret always undefined
      // await serviceUsers.writeUsersFs(data);
      return res
        .status(201)
        .json({ success: true, message: "User registered" });
    } catch (error) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА В КОНТРОЛЛЕРЕ:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  async loginUsers(req, res) {
    const { username, password } = req.body; // СОЗДАТЬ HTML ФОРМА ДЛЯ ЛОГИНА

    try {
      await serviceSessions.setSession(username, password);
      return res.status(200).json({ message: "Успешный вход!" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

module.exports = authController;
