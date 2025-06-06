const User = require("../models/user");

exports.sendFriendRequest = async (req,res) =>{
    try {
        const senderId = req.query.userId;
        const receiverId = req.params.userId;

        if(senderId === receiverId){
            return res.status(400).json({message :"Cannot add Yourself"});
            console.log("yourself")
        };

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if(!sender || !receiver){
            return res.status(404).json({message: "User not found"});
            console.log("not foound")
        }

        if(sender.friends.includes(receiverId)){
            return res.status(400).json({message : "Already Friends"});
            console.log("aready")
        }

        if(!sender.sentFriendRequest.includes(receiverId)){
            sender.sentFriendRequest.push(receiverId);
        }

        if(!receiver.recivedFriendRequest.includes(senderId)){
            receiver.recivedFriendRequest.push(senderId);
        }

        await sender.save();
        await receiver.save();

        return res.status(200).json({message: "Friend request sent"});
    } catch (error) {
        console.error("Error in sendFriendRequest:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.acceptFriendRequest = async (req,res) =>{
    try {
        const receiverId = req.query.userId; //current logged-in-user
        const senderId = req.params.userId;

        const receiver = await User.findById(receiverId);
        const sender = await User.findById(senderId);

        if(!receiver || !sender){
            return res.status(404).json({message: "User not found"});
        }

        // Remove from request lists - assign filtered arrays back
        receiver.recivedFriendRequest = receiver.recivedFriendRequest.filter(id => id.toString() !== senderId);
        sender.sentFriendRequest = sender.sentFriendRequest.filter(id => id.toString() !== receiverId);

        // Add each other as friends if not already friends
        if(!receiver.friends.includes(senderId)){
            receiver.friends.push(senderId);
        }
        if(!sender.friends.includes(receiverId)){
            sender.friends.push(receiverId);
        }

        await receiver.save();
        await sender.save();

        return res.status(200).json({message : "Friend request accepted"});
    } catch (error) {
        console.error("Error in acceptFriendRequest:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.unfriend = async (req, res) =>{
    try {
        const userId = req.query.userId;
        const otherUserId = req.params.userId;

        const user = await User.findById(userId);
        const otherUser = await User.findById(otherUserId);

        if(!user || !otherUser){
            return res.status(404).json({message: "User not found"});
        }

        // Remove friend from both users
        user.friends = user.friends.filter(id => id.toString() !== otherUserId);
        otherUser.friends = otherUser.friends.filter(id => id.toString() !== userId);

        await user.save();
        await otherUser.save();

        return res.status(200).json({message : "Unfriended successfully"});
    } catch (error) {
        console.error("Error in unfriend:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.cancelRequest = async (req, res) =>{
    try {
        const userId = req.query.userId;
        const sentUserId = req.params.userId;

        const user = await User.findById(userId);
        const sentUser = await User.findById(sentUserId);

        if(!user || !sentUser){
            return res.status(404).json({message: "User not found"});
        }

        // Remove request from both users
        user.sentFriendRequest = user.sentFriendRequest.filter(id => id.toString() !== sentUserId);
        sentUser.recivedFriendRequest = sentUser.recivedFriendRequest.filter(id => id.toString() !== userId);

        await user.save();
        await sentUser.save();

        return res.status(200).json({message : "Friend request cancelled"});
    } catch (error) {
        console.error("Error in cancelRequest:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.getFriendsStatus = async (req,res) =>{
    try {
        // console.log(req);
        // if(!req.user || !req.user.id){
        //     return res.status(401).json({message: "Unauthorized: User not authenticated"});
        // }
        const currentUserId = req.query.userId || req.user.id; // Get current user ID from query or authenticated user
        const targetUserId = req.params.userId;

        const currentUser  = await User.findById(currentUserId);

        if(!currentUser){
            return res.status(404).json({message: "User not found"});
        }

        let status = "";

        if(currentUser.friends.includes(targetUserId)){
            status = "friends";
        } else if(currentUser.sentFriendRequest.includes(targetUserId)){
            status = "request sent";
        } else if( currentUser.recivedFriendRequest.includes(targetUserId)){
            status = "request received";
        } else {
            status = "not friends";
        }

        return res.json({status});
    } catch (error) {
        console.error("Error in getFriendsStatus:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
