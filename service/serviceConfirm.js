const codeRepository = require("../repositories/GETcode.repository");

const confirm = {
  async confirm(code, email) {
    try {
      const data = await codeRepository.getCode(email);
      //при проверке хэшировать входящий userCode и сравнивать хэши
      //проверка на время еще код
      console.log(data.verification_code, code.userCode);

      if (data.verification_code !== code.userCode) {
        return { success: false, message: "Неверный код" };
      }
      // Активируем пользователя / Переносим из временной таблицы в основную
      // await codeRepository.DELETECode(email);

      return { success: true };
    } catch (error) {
      console.log("ОШИБКА", error);

      return { success: false };
    }
  },
};

module.exports = confirm;
