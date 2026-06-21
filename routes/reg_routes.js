const Router = require("express");
const router = Router();
const regController = require("../controllers/reg_controller");

router.post("/confirm", regController.confirmReg); //Защита от брутфорса
router.post("/reg", regController.StartReg);

// router.post("/api/login", controller.loginUsers);

module.exports = router;
