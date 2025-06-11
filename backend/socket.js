const { setUserOnline, setUserOffline } = require("./controllers/userControllers");
const Message = require("./models/message");
const User = require("./models/user")

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected", socket.id);

    // When frontend says user is online
    socket.on("user-Online", async (userId) => {
      const updatedUser = await setUserOnline(userId, socket.id);
      console.log(`${updatedUser.name} is now online`);
      io.emit("statusUpdate", { userId: updatedUser._id, status: "online" });
    });

    // Handle incoming "send-message" event from client
    // Changed to accept a single object argument containing senderId, reciverId, and message
    // This fixes the previous error where the entire object was passed as sender, causing validation failure
    socket.on("send-message", async (data) => {
        const { senderId, reciverId, message } = data;
        const newMessage = await Message.create({
          sender: senderId,
          reciver: reciverId,
          message: message,
          seen: false
        });

        // Find the receiver's user document to get socket ID
        const receiverUser = await User.findById(reciverId);

        // Emit the message to the receiver if online
        if(receiverUser && receiverUser.socketId){
          io.to(receiverUser.socketId).emit("receive-message", newMessage);
        }

        // Emit the message to the sender as well for real-time update
        io.to(socket.id).emit("receive-message", newMessage);
    });

    // Mark message as seen
    socket.on("seen-message",async({messageId})=>{
          const message = await Message.findByIdAndUpdate(messageId,{seen:true},{new:true});
          const senderMessages = await Message.find({sender:message.sender});

          // Emit the seen message event to the sender's socket(s)
          if(senderMessages && senderMessages.length > 0){
            senderMessages.forEach(msg => {
              if(msg.socketId){
                io.to(msg.socketId).emit("message-seen",messageId);
              }
            });
          }
    });

    // When user disconnects (refresh/close tab/leave)
    socket.on("disconnect", async () => {
      const updatedUser = await setUserOffline(socket.id);
      if (updatedUser) {
        console.log(`${updatedUser.name} is now offline`);
        io.emit("statusUpdate", { userId: updatedUser._id, status: "offline" });
      }
    });
  });
};
