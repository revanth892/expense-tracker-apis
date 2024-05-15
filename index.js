const express = require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const MONGO_URL='mongodb+srv://asrevanthnaidu:rnlFsmhseifVGtL3@cluster0.ls7zvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 8080;
const router=require('./routes/route.js')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/',router)

app.listen(PORT,()=>{
    console.log("server is running")
})

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("the database is connected");
})
.catch(err=>{
    console.log(err)
})
