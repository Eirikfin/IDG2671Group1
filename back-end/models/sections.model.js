import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
});

const Section = mongoose.model("Section", sectionSchema);
export default Section;