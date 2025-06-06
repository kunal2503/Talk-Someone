const express = require("express");
const {getAllUser, getUserProfileInfo,editProfile,sendFriendRequest,acceptFriendRequest,unfriend} = require("../controllers/userControllers")

const router = express.Router();

router.get("/friends",getAllUser);
router.get("/userProfile/:userId",getUserProfileInfo);
router.post("/edit/profile/:userId",editProfile);


module.exports= router