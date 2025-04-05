import mongoose from "mongoose";

const researcherSchema = new mongoose.Schema({
  name: { type: String, trim: true }, //researcher name, if needed
  email: { type: String, unique: true, required: true, trim: true }, //researcher email, will be used for researcher log in
  password: { type: String, required: true }, //password will be hashed/encrypted before storage
  role: {
    type: String,
    enum: ['researcher', 'admin'],
    default: 'researcher',
  },
});

const Researcher = mongoose.model("Researchers", researcherSchema);
export default Researcher;
