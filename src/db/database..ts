import mongoose from "mongoose";
export const connectDB = async()=>{
  await  mongoose.connect(`${process.env.MONGODB_URL}`,{
        dbName: "Zamco_Boutque_Hotel"
    })
    .then((c)=> console.log(`MongoDB Connected to ${c.connection.host}`))
    .catch((e)=> console.log(e))
}