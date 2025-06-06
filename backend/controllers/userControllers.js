const User = require("../models/user");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    // console.log(users)
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal servel error" });
  }
};

exports.getUserProfileInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(req.header);
    // console.log(req);
    const userInfo = await User.findById(userId).select("-password");
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Internal servel error" });
  }
};
exports.editProfile = async (req, res) => {
  try {
    const { name, email, bio, location,phone,imageUrl } = req.body;
    const userId = req.params.userId;

    if(!name && !email){
        res.json({message:"Name and Email is required"});
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        bio,
        location,
        phone,
        imageUrl
      },
      { new: true }
    );

    res.status(200).json({message:"Information Updated",user});
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

exports.setUserOnline = async (userId, socketId) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { status: "online", socketId, lastSeen: null },
    { upsert: true, new: true }
  );
};

exports.setUserOffline = async (socketId) => {
  return await User.findOneAndUpdate(
    { socketId },
    { status: "offline", socketId: "", lastSeen: new Date() },
    { new: true }
  );
};

