const crypto = require("crypto");
const userRepository = require("../repositories/user.repository");
const transport = require("./serviceTransportMaill");
const confirm = require("./serviceConfirm");
const bcrypt = require("bcrypt");

const users = {
  async writeUsers(data) {
    const user = {
      email: data.email,
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
    };
    console.log("Хэшированный пароль:", user);
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const value = await userRepository.create(user, verificationCode);
    await transport.sendVerificationCode(data.email, verificationCode);
  },
};
module.exports = users;
