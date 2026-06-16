const Router = require("express");
const router = Router();
const controller = require("../controllers/confirm_controller");

router.get("/confirm", controller.confirm);

// router.post("/api/confirm", controller.confirm);

module.exports = router;
