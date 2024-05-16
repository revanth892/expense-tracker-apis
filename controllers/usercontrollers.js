
const User=require("../models/user.js")
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const secretkey='SECRETKEY'
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
            const user =await User.findOne({username:username})
            const hashed_password = await bcrypt.compare(password,user.password)
            if(hashed_password)
            {
                // console.log(user.id)
                const token = jwt.sign(user.id,secretkey)
                // console.log((token))
                res.status(200).json({message:"User logged successfully",user:user,token:token})
            }
            else{
                res.status(400).json({message:"Incorrect username or password"})
            }
    }catch(err)
    {
        console.error("Error creating blog:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}




module.exports={register,login};