const express=require('express')
const {register,login}=require('../controllers/usercontrollers.js')
const {createRecord,getall,getbymonth}=require('../controllers/datacontrollers.js')
const {authenticateToken}=require('../middleware/authmiddleware.js')
const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/createRecord',authenticateToken,createRecord)
router.get('/getall',authenticateToken,getall)
router.get('/getbymonth',authenticateToken,getbymonth)
module.exports=router;