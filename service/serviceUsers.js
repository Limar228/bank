const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const loginRepository = require("../repositories/loginRepository");
const transport = require("./serviceTransportMaill");
const confirm = require("./serviceConfirm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = {
  async getUsers(user) {
    const userFromBD = await userRepository.getData(user);
    return userFromBD;
  },
  async writeUsers(data) {
    const user = {
      email: data.email,
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
    };
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const value = await userRepository.create(user, verificationCode);
    await transport.sendVerificationCode(data.email, verificationCode);
  },
  async loginUsers(data) {
    const users = await loginRepository.getUsers(data);

    const isMatch = await bcrypt.compare(data.password, users.password);

    if (!isMatch) {
      return { success: false, message: "Пользователь не найден" };
    }
    return {
      success: true,
      users: {
        id_user: users.id_user,
        username: users.username,
      },
    };
  },
};
module.exports = users;
