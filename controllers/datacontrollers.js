const Record = require('../models/record.js')

const createRecord=async(req,res)=>{
    const userid=req.id
    let {description,amount,income,expense,date,month} = (req.body.data);
    month=month.toUpperCase();
        try{  const record = new Record({
            userid,  description,amount,income,expense,date,month
        })
        await record.save();
        res.status(200).json({message:"record created succesfully",record:record})
    }
    catch(err)
    {
        console.error("Error creating record:",err);
        res.status(500).json({message:"internal server error"})
    }
}

const getall=async(req,res)=>{
    const userid=req.id;
    const expense=req.query.expense==='true';
    const income=req.query.income==='true';
    let data;
    console.log(userid)
        try{  
            if(expense=== true && income=== true)
            {
                data= await Record.find({userid:userid})
            }
            else if(expense===true && income===false)
            {
                console.log(2)
                data= await Record.find({userid:userid,expense:true})
            }
            else if(expense===false && income===true)
            {
                data= await Record.find({userid:userid,income:true})
                
            }
            
            
            if(!data || data.length===0)
            {
                res.status(404).json({message:"No records found"})
            }
            else
            {
                res.status(200).json({message:"few record found",data:data})
            }
    }
    catch(err)
    {
        console.error("Error creating record:",err);
        res.status(500).json({message:"internal server error"})
    }
}


const getbymonth=async(req,res)=>{
    const userid=req.id;
    const expense=req.query.expense==='true';
    const income=req.query.income==='true';
    let month=req.query.month;
    month=month.toUpperCase();
    console.log(typeof(month));
    let data;
    // console.log(user)
        try{  
            if(expense=== true && income=== true)
            {
                data= await Record.find({userid:userid,month:month})
            }
            else if(expense===true && income===false)
            {
                data= await Record.find({userid:userid,month:month,expense:true})
            }
            else if(expense===false && income===true)
            {
                data= await Record.find({userid:userid,month:month,income:true})
                
            }
            
            
            if(!data)
            {
                res.status(400).json({message:"No records found"})
            }
            else
            {
                res.status(200).json({message:"few record found",data:data})
            }
    }
    catch(err)
    {
        console.error("Error creating record:",err);
        res.status(500).json({message:"internal server error"})
    }
}



const getbyamount=async(req,res)=>{
    const userid=req.id;
    const expense=req.query.expense==='true';
    const income=req.query.income==='true';
    const greater=req.query.greater==='true';
    const amount=req.query.amount;

    // const lesser=req.query.lesser==='true'
    let data;
    // console.log(user)
        try{  
            if(expense=== true && income=== true)
            {
                if(greater===true)
                {
                    data= await Record.find({userid:userid,amount:{$gte:amount}})
                }
                else
                {
                    data= await Record.find({userid:userid,amount:{$lte:amount}})
                }
                // data= await Record.find({userid:userid,amount:{$gte:amount}})
            }
            else if(expense===true && income===false)
            {
                if(greater===true)
                {
                        data= await Record.find({userid:userid,amount:{$gte:amount},expense:true})
                }
                else 
                {
                        data= await Record.find({userid:userid,amount:{$lte:amount},expense:true})
                }
            }
            else if(expense===false && income===true)
            {
                if(greater===true)
                    {
                            data= await Record.find({userid:userid,amount:{$gte:amount},income:true})
                    }
                    else 
                    {
                            data= await Record.find({userid:userid,amount:{$lte:amount},income:true})
                    }
            }
            
            
            if(!data)
            {
                res.status(400).json({message:"No records found"})
            }
            else
            {
                res.status(200).json({message:"few record found",data:data})
            }
    }
    catch(err)
    {
        console.error("Error creating record:",err);
        res.status(500).json({message:"internal server error"})
    }
}

const getone=async(req,res)=>{
    const userid=req.id;
    const {id}=req.query;
    let data;
    // console.log(0)
    // console.log(userid)
    // console.log(1)
    // console.log(id)
    // console.log(2)
        try{  
                // console.log(3)
                data= await Record.findById(id)
                // console.log(4)
                // console.log(data)
                if(data.userid === userid)
                {    
                    res.status(200).json({message:"few record found",data:data})
                }
                else 
                {
                    res.status(400).json({message:"not matched"})
                }
        }
    catch(err)
    {
        console.error("Error creating record:",err);
        res.status(500).json({message:"internal server error"})
    }
}

const updateone=async(req,res)=>{
    const userid=req.id;
    let {description,amount,income,expense,date,month} = (req.body.data);
    const {id}=req.query;
    let data;
    // console.log(userid)
        try{  
                data= await Record.findByIdAndUpdate(id,{description,amount,income,expense,date,month},{new:true})
                if(data.userid === userid)
                {
                    res.status(200).json({message:"updated successfully",data:data})
                }
                else{
                    res.status(400).json({message:"not matched"})
                }
        }
    catch(err)
    {
        console.error("Error creating record:",err);
        res.status(500).json({message:"internal server error"})
    }
}

// const deleteone=async(req,res)=>{
//     const userid=req.id;
//     const {id}=req.query;
//     let data;
//     // console.log(userid)
//         try{  
//                 data= await Record.findByIdAndDelete(id)
//                 res.status(200).json({message:"updated successfully",data:data})
//         }
//     catch(err)
//     {
//         console.error("Error record:",err);
//         res.status(500).json({message:"internal server error"})
//     }
// }

const deleteone = async (req, res) => {
    const userid = req.id;
    const { id } = req.query;

    try {
        const data = await Record.findByIdAndDelete(id);
        // console.log(data)
        if (data) {
            res.status(200).json({ message: "Record deleted successfully", data: data });
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (err) {
        console.error("Error deleting record:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports={createRecord,getall,getbymonth,getbyamount,getone,updateone,deleteone};