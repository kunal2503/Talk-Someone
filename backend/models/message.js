const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    reciver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    message : {
        type: String,
    },
    seen : {type:Boolean,default:false},
},{timestamps:true})

module.exports = mongoose.model("Message",messageSchema);