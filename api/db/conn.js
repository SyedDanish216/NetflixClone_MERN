const mongoose=require("mongoose");
const DB=process.env.MONGO_URL;
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("DB connection successfull...."))
.catch((err)=>console.log(err));
