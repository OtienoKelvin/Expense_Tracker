const express = require("express");
const {login, register, logout, checkSession, refreshToken} = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/check-session", checkSession);
router.get("/refresh-token", refreshToken);



module.exports = router