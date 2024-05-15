
const User=require("../models/user.js")
const bcrypt=require('bcrypt')
const register=async(req,res)=>{
    let {username ,password,email} =req.body.data;

    try{

        const hashed_password = await bcrypt.hash(password, 8)
        password=hashed_password;
        const user= new User({
            username,email,password
        });
        
        await user.save();
        res.status(201).json({message:"User created successfully"})

    }catch(err)
    {
        console.error("Error creating blog:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login=async(req,res)=>{
    const {username ,password} =req.body.data;
    // console.log(1)
    try{
        // console.log(2)
        if()
        {
            const user =await User.find({username:username,password:password})
            res.status(201).json({message:"User logged successfully",user:user})
        }
        else{
            
        }
    }catch(err)
    {
        console.error("Error creating blog:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}




module.exports={register,login};