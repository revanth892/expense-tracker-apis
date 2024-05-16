const express=require('express')
const {register,login}=require('../controllers/usercontrollers.js')
const {createRecord,getall,getbymonth,getbyamount,getone,updateone,deleteone}=require('../controllers/datacontrollers.js')
const {authenticateToken}=require('../middleware/authmiddleware.js')
const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/createRecord',authenticateToken,createRecord)
router.get('/getall',authenticateToken,getall)
router.get('/getbymonth',authenticateToken,getbymonth)
router.get('/getbyamount',authenticateToken,getbyamount)
router.get('/getone',authenticateToken,getone)
router.get('/updateone',authenticateToken,updateone)
router.get('/deleteone',authenticateToken,deleteone)
module.exports=router;