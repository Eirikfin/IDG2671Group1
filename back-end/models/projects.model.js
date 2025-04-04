import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  researcherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Researcher",
  }, //refrences researcher.model.js
  title: { type: String, required: true }, //title of project/study
  questions: [
    { questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" } },
  ], //an array of questions, refrences questions.model.js
  status: {
    type: String,
    required: true,
    enum: ["notPublished", "active", "concluded"], //status of project/study, should decide if participants can submit answers
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
