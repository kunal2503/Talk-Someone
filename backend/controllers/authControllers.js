const User = require("../models/user");
const OtpToken = require("../models/otp");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getOtp = () => {
 return Math.floor(100000 + Math.random() * 900000).toString();
};

//send otp
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
//   console.log("email", email);
  if (!email){
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await User.findOne({ email });
//   console.log("user", user);
  if (!user) return res.status(400).json({ message: "User not found" });

  const otp = getOtp();
//   console.log("otp", otp);
  await OtpToken.create({ email, otp });

  await sendEmail(email, "OTP for Password reset", `Your otp is: ${otp}`);
  res.json({ message: "otp send successfully" });
};

//verify otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const token = await OtpToken.findOne({ email, otp });

  if (!token)
    return res.status(400).json({ message: "Invaild or opt Expires" });

  res.json({ message: "otp verifyed successfull" });
};

//resentPassword
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const token = await OtpToken.findOne({ email, otp });
  if (!token)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  await OtpToken.deleteOne({ email, otp });

  res.json({ message: "Password reset successfully" });
  
};

//signUp Users
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Aready have Account" });
    }

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ messgae: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ messgae: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgetPassword = async () => {
  // This function is not implemented yet
  // You can implement the logic for password reset here
  // For example, you can send a reset link to the user's email
  // and handle the password reset process.
  res.status(501).json({ message: "Not implemented yet" });
};
