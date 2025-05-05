import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  researcherId: { type: mongoose.Schema.Types.ObjectId, ref: "Researcher", required: true },
  questionText: { type: String, required: true },
  typeOfQuestion: { type: String, enum: ["MultipleChoice", "TextInput", "SlidingScale"], required: true },
  questionAlternatives: { type: [String], default: [] },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
