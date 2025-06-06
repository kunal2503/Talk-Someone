const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


//signUp Users
exports.signupUser = async (req,res) =>{
    try{
        const {name, email, password} = req.body;
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message : "Aready have Account"})
        }

        const salt = await  bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = User({
            name:name,
            email:email,
            password:hashedPassword
        })
        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});

        res.status(201).json({token,user:{
            id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        }})
    } catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};

exports.loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({messgae:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({messgae:"Invalid credentials"});
        }   

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
        res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    } catch(error){
        console.log(error)
         res.status(500).json({ message: "Internal server error" });
    }
}

exports.forgetPassword= async()=>{
    // This function is not implemented yet
    // You can implement the logic for password reset here
    // For example, you can send a reset link to the user's email
    // and handle the password reset process.
    res.status(501).json({ message: "Not implemented yet" });
    
}