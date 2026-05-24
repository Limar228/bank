const Router = require("express");
const router = Router();
const controller = require("./controller");

router.get("/reg", controller.html);

router.get("/users", controller.getUsers);

router.post("/api/reg", controller.postUsers);

router.post("/api/login", controller.loginUsers);

module.exports = router;
