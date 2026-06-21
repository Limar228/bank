const path = require("path");
const serviceUsers = require("../service/serviceUsers");
const serviceConfirm = require("../service/serviceConfirm");

const authController = {
  async StartReg(req, res) {
    const data = req.body;
    console.log(data);
    try {
      if (data.password !== data.password) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }
      await serviceUsers.writeUsers(data);
      res.cookie("registration_email", req.body.email, {
        httpOnly: true, // Защита от кражи скриптами
        secure: true, // Только по HTTPS в продакшене
        sameSite: "strict",
        maxAge: 5 * 60 * 1000, // 5 минут жизни
      }); //ПОДРОБНЕЕ

      return res
        .status(200)
        .json({ success: true, message: "Код успешно отправлен на почту" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async confirmReg(req, res) {
    const email = req.cookies.registration_email;
    const code = req.body;
    try {
      if (!email || !code) {
        return res.status(400).json({ message: "Email и код обязательны" });
      }

      const result = await serviceConfirm.confirm(code, email); // Должен вернуть ок
      if (result.success) {
        res
          .status(201)
          .json({ success: true, message: "Вы зарегистрированны" });
      } else {
        res.status(500).json({ message: "Ошибка при регистрации" });
      }
    } catch (error) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА В КОНТРОЛЛЕРЕ:", error);
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
