const express = require("express");
const {sendFriendRequest,acceptFriendRequest,unfriend,cancelRequest,getFriendsStatus} = require("../controllers/friendControllers")

const router = express.Router();


router.get("/:userId/status",getFriendsStatus);
router.post("/:userId/add-friend",sendFriendRequest);
router.post("/:userId/accept-friend",acceptFriendRequest);
router.delete("/:userId/unfriend",unfriend);
router.delete("/:userId/cancel-request",cancelRequest);

module.exports = router
