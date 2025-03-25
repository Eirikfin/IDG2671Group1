import mongoose from "mongoose";


const researcherSchema = new mongoose.Schema({
    "username":{ type: String, required: true},
    "name": {type: String},
    "password":{ type: String, required: true},
    "email": { type: String, required: true, unique: true},
    "researcherID": {type: Number, required: true, unique: true} 
}) 
 
const researcherData = mongoose.model("Researcher", researcherSchema);

export default researcherData;