const Router = require("express");
const router = Router();
const token = require("../controllers/refreshToken");
const auth = require("../controllers/auth");
const api = require("../controllers/api_controller");
const refreshToken = require("../controllers/refreshToken");

router.get("/user/dashboard", refreshToken, auth, api.getUserData);
router.post("/user/replenish", refreshToken, auth, api.updateUser);
router.get("/cards", refreshToken, auth, api.getCards);
router.post("/cards/newCards", refreshToken, auth, api.createCards);
router.post("/transfer", refreshToken, auth, api.transfer);
// router.post("/loggout", api.loggout);

module.exports = router;
