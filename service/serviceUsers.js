const fs = require("fs/promises");

class Users {
  async getUsersFs() {
    try {
      const data = await fs.readFile("users.json", "utf-8");
      return JSON.parse(data);
    } catch {
      throw new Error("Ошибка при регистрации");
    }
  }

  async writeUsersFs(param) {
    try {
      const getUser = await this.getUsersFs();
      getUser.push(param);
      await fs.writeFile(
        "users.json",
        JSON.stringify(getUser, null, 2),
        "utf-8",
      );
    } catch {
      throw new Error("Ошибка при регистрации");
    }
  }
}
module.exports = new Users();
