const codeRepository = require("../repositories/AUTHcode.repository");
const usersCards = require("./serviceCards");

const confirm = {
  async confirm(code, email) {
    const data = await codeRepository.getCode(email);
    console.log(data);

    if (data.verification_code_expires.getTime() < Date.now()) {
      //Cannot read properties of null (reading 'verification_code_expires') ПРИ 2 РАЗЕ
      return { success: false, message: "Код доступа истек" };
    }

    if (data.verification_code !== code.userCode) {
      return { success: false, message: "Неверный код" };
    }
    const user = await codeRepository.transactionUsers(email);
    console.log("ПОЛЬЗОВАТЕЛЬ", user);
    await usersCards.createCards({}, user.id_user);

    return { success: true };
  },
};

module.exports = confirm;
