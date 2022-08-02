const mongoose=require("mongoose")
const config=require("config")
const db="mongodb+srv://shailaja:Shailaja@cluster0.qo4ot.mongodb.net/?retryWrites=true&w=majority"

const connectDB=async ()=>{
    try {
        await mongoose.connect(db,
            { 
                useNewUrlParser:true,
                useUnifiedTopology:true,
                // useCreateIndex: true,
                // useFindAndModify:false

       }  )
        console.log("MongoDB connected......");
    } catch (err) {
        console.log(err.message);

        // Exist process
        process.exit(1);
    }
}
module.exports=connectDB;