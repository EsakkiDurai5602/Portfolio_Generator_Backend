const express=require("express");
const cors=require("cors");

const connectDB=require("./connection");
const PORT=8001

const authRoutes=require("./routes/authRoutes");
const portfolioRoutes=require("./routes/portfolioRoutes");

const app=express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth",authRoutes);
app.use("/portfolio",portfolioRoutes);

app.get("/",(req,res)=>{
    res.send("Portfolio Generator Backend Running");
});

app.listen(PORT,()=>{
    console.log("Server running on port 8001");
});