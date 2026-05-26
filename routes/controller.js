const path = require("path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function getUsersFs() {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Ошибка при регистрации" });
  }
}

async function writeUsersFs(param) {
  try {
    const getUser = await getUsersFs();
    console.log(getUser);

    getUser.push(param);
    await fs.writeFile("users.json", JSON.stringify(getUser, null, 2), "utf-8");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Ошибка при регистрации" });
  }
}

async function readSessionsFromFile() {
  try {
    const data = await fs.readFile("sessions.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Ошибка при регистрации" });
  }
}

async function writeSessionsFromFile(param) {
  try {
    const getSessions = await readSessionsFromFile();
    getSessions.push(param);
    await fs.writeFile(
      "sessions.json",
      JSON.stringify(getSessions, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error(error);
  }
}

async function sendVerificationCode(userEmail, code) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"Мой Проект" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: "Код подтверждения регистрации",
    text: `Ваш код верификации: ${code}. Он действует 10 минут.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Письмо с кодом успешно отправлено на " + userEmail);
  } catch (error) {
    throw new Error("Ошибка отправки письма: " + error.message);
  }
}

class Route {
  async postUsers(req, res) {
    const data = req.body;
    const generatedCode = Math.floor(100000 + Math.random() * 900000); // проверка

    try {
      await sendVerificationCode(data.email, generatedCode);
    } catch (error) {
      console.error("Ошибка при отправке письма:1111", error);
      return res.status(500).json({ error: "Ошибка при отправке письма" });
    }

    await writeUsersFs(data);
    res.sendFile(path.join(__dirname, "..", "public", "confirm.html"));
  }

  async html(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "reg.html"));
  }

  async loginUsers(req, res) {
    const { username, password } = req.body; // СОЗДАТЬ HTML ФОРМА ДЛЯ ЛОГИНА

    const users = await getUsersFs();
    const user = users.find(
      (user) => user.name === name && user.password === password,
    );

    if (!user) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const sessionId = crypto.randomBytes(32).toString("hex");

    const sessions = await readSessionsFromFile();
    sessions.push({
      sessionId,
      userEmail: user.email,
      expiresAt: Date.now() + 3600000, // 1 час жизни
    });
    await writeSessionsToFile(sessions);

    // 4. Устанавливаем куку
    res.cookie("sessionId", sessionId, {
      httpOnly: true, // Защита: JS на клиенте не сможет прочитать куку
      maxAge: 3600000, // 1 час в миллисекундах
      secure: false, // Поставьте true, если используете HTTPS
    });

    res.json({ message: "Успешный вход!" });
  }
}

module.exports = new Route();
