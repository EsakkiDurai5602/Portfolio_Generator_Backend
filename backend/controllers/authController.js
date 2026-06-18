const User=require("../models/User");

async function register(req,res){
    try{
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const user=new User({name,email,password});

        await user.save();

        return res.status(201).json({
            message:"User Registered Successfully",
            user
        });
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

async function login(req,res){
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(user.password!==password){
            return res.status(400).json({message:"Invalid password"});
        }

        return res.status(200).json({
            message:"Login Success",
            user
        });
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

module.exports={register,login};