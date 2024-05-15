const express = require('express')

const cors =require('cors')

const PORT = 8080;

const app = express()

app.use(express.json())
app.use(cors())


app.listen(PORT,()=>{
    console.log("server is running")
})


