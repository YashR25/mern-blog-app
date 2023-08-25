const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginController);
router.post("/signUp", authController.signUpController);
router.get("/refresh", authController.refreshAccessTokenController);
router.get("/logout", authController.logoutController);

module.exports = router;
