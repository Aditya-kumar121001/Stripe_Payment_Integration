const bodyParser = require("body-parser");
const express = require("express")
const dotenv = require("dotenv").config()
const app=express();
const port = process.env.PORT || 5000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/", require("./routes/paymentRoutes"))
//server
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})