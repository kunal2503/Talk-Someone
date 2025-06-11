const express = require("express");
const router = express.Router();
const { getMessagesBetweenUsers } = require("../controllers/messageControllers");

// Route to get messages between two users
router.get("/:userId1/:userId2", getMessagesBetweenUsers);

module.exports = router;
