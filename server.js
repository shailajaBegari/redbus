const express = require("express")
const connectDB=require("./config/data")
// const  mongoose = require('mongoose');

const app = express();

connectDB()

app.use(express.json({extended:false}))

app.get("/",(req,res)=>res.send("API RUNNING"))

app.use("/api/users",require("./routes/api/users"))
app.use("/api/auth",require("./routes/api/auth"))
app.use("/api/bus",require("./routes/api/bus"))
app.use("/api/admin",require("./routes/api/admin"))
app.use("/api/ticket",require("./routes/api/ticket"))

const PORT=process.env.PORT ||6000;

app.listen(PORT,()=>console.log(`sever started port ${PORT}`))

