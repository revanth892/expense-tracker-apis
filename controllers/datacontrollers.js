const Expense = require('../models/expense.js')

const createRecord=async(req,res)=>{
    const usedId=req.id
    let {} = (req.body.data)
    res.status(200).json({message:"reached here"})
}


module.exports={createRecord};