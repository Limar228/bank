const Router = require("express");
const router = Router();
const controller = require("../controllers/html_controller");
const auth = require("../controllers/auth");
const refreshToken = require("../controllers/refreshToken");

router.get("/reg", controller.reg);
router.get("/login", controller.login);
router.get("/reg/confirm", controller.confirm);
router.get("/dashboard", refreshToken, auth, controller.dashboard);
router.get("/replenish", refreshToken, auth, controller.replenish);
router.get("/cards", refreshToken, auth, controller.cards);
router.get("/newCards", refreshToken, auth, controller.newCards);

module.exports = router;
