const path = require("path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

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
    const data = await fs.writeFile(
      "users.json",
      JSON.stringify(getUser, null, 2),
      "utf-8",
    );
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
    const getUser = await getUsersFs();
    console.log(getUser);

    getUser.push(param);
    const data = await fs.writeFile(
      "users.json",
      JSON.stringify(getUser, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Ошибка при регистрации" });
  }
}

class Route {
  async getUsers(req, res) {
    res.json("work");
  }

  async postUsers(req, res) {
    const data = req.body;
    await writeUsersFs(data);
    res.status(201).json({ message: "Успешно зарегистрирован" });
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
      expiresAt: new Date(Date.now() + 3600000), // 1 час жизни
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
