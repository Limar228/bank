const Router = require("express");
const router = Router();
const controller = require("../controllers/html_controller");

router.get("/reg", controller.html);

module.exports = router;
