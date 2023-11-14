const { register } = require("../controllers/registerController");

const router = require("express").Router();

router.post("/register", register);

module.exports = router;
