const path = require("path");
const serviceUsers = require("../service/serviceUsers");
const serviceConfirm = require("../service/serviceConfirm");

const authController = {
  async StartReg(req, res) {
    const data = req.body;
    console.log(data);
    try {
      if (data.password !== data.password1) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }
      await serviceUsers.writeUsers(data);
      res.cookie("registration_email", req.body.email, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 5 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Подтвердите код",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async confirmReg(req, res) {
    const email = req.cookies.registration_email;
    const code = req.body;
    try {
      if (!email || !code) {
        return res.status(400).json({ message: "Email и код обязательны" });
      }

      const result = await serviceConfirm.confirm(code, email);
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: "Вы успешно зарегистрировались",
        });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error("КРИТИЧЕСКАЯ ОШИБКА В КОНТРОЛЛЕРЕ:", error);
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
