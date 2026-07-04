const Router = require("express");
const router = Router();
const regController = require("../controllers/reg_controller");
const logController = require("../controllers/login_controller.js");

router.post("/confirm", regController.confirmReg); //Защита от брутфорса
router.post("/reg", regController.StartReg);
router.post("/login", logController.loginUsers);

module.exports = router;
