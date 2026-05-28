const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

class SessionsService {
  async readSessionsFromFile() {
    try {
      const data = await fs.readFile("sessions.json", "utf-8");
      return JSON.parse(data);
    } catch {
      throw new Error("Ошибка при работе с сессиями");
    }
  }
  async writeSessionsToFile(param) {
    try {
      const getSessions = await this.readSessionsFromFile();
      getSessions.push(param);
      await fs.writeFile(
        "sessions.json",
        JSON.stringify(getSessions, null, 2),
        "utf-8",
      );
    } catch {
      throw new Error("Ошибка при работе с сессиями");
    }
  }

  async setSession(username, password) {
    try {
      const users = await serviceUsers.getUsersFs();
      const user = users.find(
        (user) => user.name === username && user.password === password,
      );

      if (!user) {
        throw new Error("Неверные имя пользователя или пароль");
      }

      const sessionId = crypto.randomBytes(32).toString("hex");

      const sessions = await this.readSessionsFromFile();
      sessions.push({
        sessionId,
        userEmail: user.email,
        expiresAt: Date.now() + 3600000, // 1 час жизни
      });
      await this.writeSessionsToFile(sessions);

      // 4. Устанавливаем куку
      res.cookie("sessionId", sessionId, {
        httpOnly: true, // Защита: JS на клиенте не сможет прочитать куку
        maxAge: 3600000, // 1 час в миллисекундах
        secure: false, // Поставьте true, если используете HTTPS
      });
    } catch {
      throw new Error("Ошибка при работе с сессиями");
    }
  }
}

module.exports = new SessionsService();
