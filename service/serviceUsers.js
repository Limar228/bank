const crypto = require("crypto");
const userRepository = require("../repositories/user.repository");
const transport = require("./serviceTransportMaill");
const confirm = require("./serviceConfirm");

const users = {
  async writeUsers(data) {
    try {
      const verificationCode = crypto.randomInt(100000, 999999).toString(); //bcrypt
      const value = await userRepository.create(data, verificationCode);
      console.log("value", value);
      await transport.sendVerificationCode(data.email, verificationCode);
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = users;
