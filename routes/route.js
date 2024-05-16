const express=require('express')
const {register,login}=require('../controllers/usercontrollers.js')
const {createRecord}=require('../controllers/datacontrollers.js')
const {authenticateToken}=require('../middleware/authmiddleware.js')
const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/createRecord',authenticateToken,createRecord)
module.exports=router;