import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  researcherId: { type: mongoose.Schema.Types.ObjectId, ref: "Researcher", required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
