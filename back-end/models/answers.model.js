import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true},
    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true},
    answer: {type: mongoose.Schema.Types.Mixed, required: true}
})

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;