const nodemailer = require("nodemailer");

const transport = {
  async sendVerificationCode(params, verification) {
    try {
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
        text: `Ваш код верификации: ${verification}. Он действует 5 минут.`,
      };
      console.log("Отправляем письмо на " + mailOptions.to);

      const info = await transporter.sendMail(mailOptions);

      console.log("Письмо с кодом успешно отправлено на " + params);
    } catch (error) {
      throw new Error("Ошибка отправки письма: " + error.message);
    }
  },
};
module.exports = transport;
