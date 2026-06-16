const Router = require("express");
const router = Router();
const controller = require("../controllers/user_controller");

router.post("/reg", controller.postUsers);

router.post("/api/login", controller.loginUsers);

module.exports = router;
