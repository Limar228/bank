const codeRepository = require("../repositories/AUTHcode.repository");

const confirm = {
  async confirm(code, email) {
    const data = await codeRepository.getCode(email);
    //при проверке хэшировать входящий userCode и сравнивать хэши

    if (data.verification_code_expires.getTime() < Date.now()) {
      return { success: false, message: "Код доступа истек" };
    }

    if (data.verification_code !== code.userCode) {
      return { success: false, message: "Неверный код" };
    }
    const user = await codeRepository.transactionUsers(email);
    console.log("ПОЛЬЗОВАТЕЛЬ", user);

    return { success: true };
  },
};

module.exports = confirm;
