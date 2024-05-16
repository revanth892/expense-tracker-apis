const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const secretkey='SECRETKEY'

const authenticateToken = (req,res,next)=>{
    const authHeader= req.headers['authorization'];
    // console.log(authHeader);
    const token=authHeader.split(' ')[1];
    if(token)
    {
        const decodededid=jwt.verify(token,secretkey)
        // console.log(decodededid)
        // res.status(200).json({message:"success in verifying token"});
        req.id=decodededid;
        next();
    }
    else
    {
        res.status(400).json({message:"token not present"});
    }
}

module.exports={authenticateToken}