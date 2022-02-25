const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", register);

module.exports = router;