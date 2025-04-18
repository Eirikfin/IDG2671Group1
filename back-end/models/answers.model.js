import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  }, //refrences questions.model.js
  researcherId: { type: mongoose.Schema.Types.ObjectId }, // needed for CRUD REQUESTS
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  }, //refrences session.model.js
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
