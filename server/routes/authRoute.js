const { setAvatarHandler } = require("../controllers/avatarController");
const { login } = require("../controllers/loginController");
const { logout } = require("../controllers/logoutController");
const { register } = require("../controllers/registerController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", setAvatarHandler);
router.post("/logout", logout);

module.exports = router;
