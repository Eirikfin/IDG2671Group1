import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function dbConnect(){
    try{
        console.log("Connecting to database...")
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database!");
    }catch(err){
        console.log("Failed to connect to database: ", err);
    }
}
