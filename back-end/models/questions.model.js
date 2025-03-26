import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    questionText: { type: String, required: true },
    typeOfQuestion: {
        type: String,
        required: true,
        enum: ["textInput", "MultipleChoice", "SlidingScale"]
    },
    questionAlternatives: [{ type: String }],
    artifacts:[{ type: mongoose.Schema.Types.ObjectId, ref: "Artifact" }]
});

const Question = mongoose.model("Question", questionSchema);

export default Question;