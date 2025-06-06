const express = require("express");
const {signupUser, loginUser, forgetPassword} = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/forget-password",forgetPassword);

module.exports = router;