require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");
// const messageRoute = require("./routes/messageRoutes");
const socketHandler = require("./socket");
const { url } = require("inspector");



const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors:{
    origin : "*",
  },
});


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));


async function connect() {
    await mongoose.connect("mongodb://localhost:27017/talk-someone");
}

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/user-friends",friendRoutes);
// app.use("/api/message",messageRoute);


connect()
.then(() =>{
    console.log("Connection SuccessFull");
})
.catch((error)=>{
    console.log("Connection Problem",error);
})

socketHandler(io);

app.get("/",(req,res)=>{
    res.send("server is runing on port 3000");
})

const port = process.env.PORT || 3000;

server.listen(port,()=>{
  // console.log(server)
    console.log(`Server is runing on port ${port} `);
})
