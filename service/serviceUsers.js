const crypto = require("crypto");
const userRepository = require("../repositories/user.repository");
const transport = require("./serviceTransportMaill");
const confirm = require("./serviceConfirm");

const users = {
  async writeUsers(data) {
    const verificationCode = crypto.randomInt(100000, 999999).toString(); //bcrypt
    const value = await userRepository.create(data, verificationCode);
    await transport.sendVerificationCode(data.email, verificationCode);
  },
};
module.exports = users;
