const nodemailer = require("nodemailer");

async function sendVerificationCode(params) {
  try {
    const code = Math.floor(100000 + Math.random() * 900000); // проверка

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Обязательно true для 465 порта
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
      logger: true, // ЗАСТАВИТ NODEMAILER ПИСАТЬ ВСЁ В КОНСОЛЬ
      debug: true, // ВКЛЮЧАЕТ ПОДРОБНЫЙ ДЕБАГ СЕТИ
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });
    const mailOptions = {
      from: `"Мой Проект" <${process.env.GMAIL_USER}>`,
      to: params.userEmail,
      subject: "Код подтверждения регистрации",
      text: `Ваш код верификации: ${code}. Он действует 10 минут.`,
    };
    console.log("Отправляем письмо на " + mailOptions.to);

    const info = await transporter.sendMail(mailOptions);

    console.log("=== ЛОГ УСПЕШНОЙ ОТПРАВКИ ===");
    console.log("ID сообщения (Message ID):", info.messageId);
    console.log("Список получателей, которые приняли письмо:", info.accepted);
    console.log("Статус ответа от серверов Google:", info.response);

    console.log("Письмо с кодом успешно отправлено на " + params.userEmail);

    ///code проверять
  } catch (error) {
    throw new Error("Ошибка отправки письма: " + error.message);
  }
}

module.exports = sendVerificationCode; //НЕПРАВИЛЬ МБ
