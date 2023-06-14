const express = require("express");
const RegisterUser = require("../Controllers/AuthControllers");
const router = express.Router();

router.post("/", RegisterUser.RegisterUser);
router.post("/login", RegisterUser.Login);

module.exports = router;
