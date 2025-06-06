const { setUserOnline, setUserOffline } = require("./controllers/userControllers");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected", socket.id);

    // When frontend says user is online
    socket.on("user-Online", async (userId) => {
      const updatedUser = await setUserOnline(userId, socket.id);
      console.log(`${updatedUser.name} is now online`);
      io.emit("statusUpdate", { userId: updatedUser._id, status: "online" });
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
