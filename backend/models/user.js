const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String,required:true ,unique:true},
    email:{type:String,required:true, unique:true},
    bio:{type:String},
    location:{type:String},
    phone:{type:Number},
    imageUrl:{type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLagMrwz64oHxWRmZHkAtjiXSCv_1-vTQr4r4rah-WN0OUQFZkWUXBcNs&s"},
    password:{type:String,required:true},
    status : {
        type:String,
        enum: ["online","offline"],
        default:"offline"
    },
    lastSeen:{
        type: Date,
    },
    socketId :{
        type:String,
        default :null
    },
    friends :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    sentFriendRequest : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    recivedFriendRequest : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
    
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);