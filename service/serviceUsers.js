const fs = require("fs").promises;
const userRepository = require("../repositories/user.repository");

const users = {
  async getUsersFs() {
    try {
      const data = await fs.readFile("users.json", "utf-8");
      return JSON.parse(data);
    } catch {
      throw new Error("Ошибка при регистрации");
    }
  },

  async writeUsersFs(param) {
    try {
      await userRepository.create(param);
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = users;
