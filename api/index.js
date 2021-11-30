const express=require("express");
const mongoose=require("mongoose");
const Cors=require("cors");
const dotenv=require("dotenv");
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users");
const movieRoute=require("./routes/movies");
const listRoute=require("./routes/lists");



//App config
const app=express();
const port = process.env.PORT || 8000;
dotenv.config();
require("./db/conn");


//Middleware
app.use(express.json())
app.use(Cors());


//APi endpoints
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute);



//Listener
app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})
