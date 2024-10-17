const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const validator = require("../middlewares/validator");

router.post("/register", validator.registerValidator, authController.register);
router.post("/login", validator.loginValidator, authController.login);

module.exports = router;
