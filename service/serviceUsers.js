const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const loginRepository = require("../repositories/loginRepository");
const transport = require("./serviceTransportMaill");
const confirm = require("./serviceConfirm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { error } = require("console");

// const { loginUsers } = require("../controllers/login_controller");

const users = {
  async getUsers(token) {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    const userFromBD = await userRepository.getData(decoded);
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
  // async updateToken(token) {
  //   try {
  //     await userRepository.updateToken(token);
  //     return {
  //       success: true,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: error,
  //     };
  //   }
  // },
};
module.exports = users;
