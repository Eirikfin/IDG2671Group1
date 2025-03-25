import mongoose from "mongoose";


const researcherSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true}
})

const Researcher = mongoose.model("Researchers", researcherSchema)
export default Researcher;