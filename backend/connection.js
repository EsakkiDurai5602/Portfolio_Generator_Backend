const mongoose=require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB");
        console.log("MongoDB Connected");
    }catch(err){
        console.log(err);
    }
}

module.exports=connectDB;