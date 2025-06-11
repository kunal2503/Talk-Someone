const Message = require("../models/message");

// Controller to get messages between two users
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    // Find messages where sender and receiver match either userId1 or userId2
    const messages = await Message.find({
      $or: [
        { sender: userId1, reciver: userId2 },
        { sender: userId2, reciver: userId1 },
      ],
    }).sort({ createdAt: 1 }); // Sort by creation time ascending

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
