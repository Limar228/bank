const Router = require("express");
const router = Router();
const controller = require("./controller");

router.get("/users", controller.getUsers);

module.exports = router;
