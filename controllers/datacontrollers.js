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
// const getall = async (req, res) => {
//     const userid = req.id;
//     const expense = req.query.expense === 'true';
//     const income = req.query.income === 'true';
//     let data;

//     console.log(userid);
    
//     try {
//         if (expense && income) {
//             data = await Record.find({ userid: userid });
//         } else if (expense && !income) {
//             console.log(2);
//             data = await Record.find({ userid: userid, expense: true });
//         } else if (!expense && income) {
//             data = await Record.find({ userid: userid, income: true });
//         } else {
//             data = await Record.find({ userid: userid, expense: false, income: false });
//         }

//         if (!data || data.length === 0) {
//             res.status(404).json({ message: "No records found" });
//         } else {
//             res.status(200).json({ message: "Records found", data: data });
//         }
//     } catch (err) {
//         console.error("Error fetching records:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

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


module.exports={createRecord,getall,getbymonth};