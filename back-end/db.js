import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function dbConnect(){
    try{
        const db_url = process.env.MONGO_URI || "mongodb://localhost:27017/group1"
        console.log("Connecting to database...")
        await mongoose.connect(db_url);
        console.log("Connected to Database!");
    }catch(err){
        console.log("Failed to connect to database: ", err);
    }
}
