const nodemailer = require("nodemailer");

class Verification {
  async sendVerificationCode(params) {
    try {
      const code = Math.floor(100000 + Math.random() * 900000); // проверка

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: params,
        subject: "Код подтверждения регистрации",
        text: `Ваш код верификации: ${code}. Он действует 10 минут.`,
      };
      console.log("Отправляем письмо на " + mailOptions.to);

      const info = await transporter.sendMail(mailOptions);

      console.log("Письмо с кодом успешно отправлено на " + params);
      console.log("info", info);

      ///code проверять
    } catch (error) {
      throw new Error("Ошибка отправки письма: " + error.message);
    }
  }
}
module.exports = new Verification(); //НЕПРАВИЛЬ МБ
