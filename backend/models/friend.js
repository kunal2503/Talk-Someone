const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
        from :{
            type : mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        to : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        status : {
            type : String,
            enum : ["pending","accepted","blocked"],
            default : "pending"
        }
},{timestamps:true});

module.exports = mongoose.model("Friends",FriendsSchema);