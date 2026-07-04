const Router = require("express");
const router = Router();
const token = require("../controllers/refreshToken_controller");
const auth = require("../controllers/auth");
const api = require("../controllers/api_controller");

router.get("/user/dashboard", auth, api.getUserData);
router.post("/refresh", token.refreshToken);
router.post("/loggout", api.loggout);

module.exports = router;
