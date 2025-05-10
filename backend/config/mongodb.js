import mongoose from "mongoose";

const connectDB=async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}/foryou`)
}
 mongoose.connection.on('connected',()=>{
    console.log("db connected");
    
 })

export default connectDB;