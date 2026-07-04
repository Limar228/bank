const Router = require("express");
const router = Router();
const controller = require("../controllers/html_controller");

router.get("/reg", controller.reg);
router.get("/login", controller.login);
router.get("/reg/confirm", controller.confirm);
router.get("/dashboard", controller.dashboard);

module.exports = router;
