const express = require("express");
const {signupUser, loginUser, forgetPassword,sendOtp, verifyOtp, resetPassword} = require("../controllers/authControllers");
// const {  } = require("../controllers/authController");

const router = express.Router();


router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/forget-password",forgetPassword);

module.exports = router;