import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }, //refrences project.model.js
    questionText: { type: String, required: true }, //text for the questions asked
    typeOfQuestion: {
        type: String,
        required: true,
        enum: ["textInput", "MultipleChoice", "SlidingScale"] //type of question asked, will decide participant answer datatype 
    },
    questionAlternatives: [{ type: String }], //Optional: if multiple choice, answer alternatives will be stored here
    artifacts:[{ artifactId: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact" }}]  //array of artifacts related to question, refrences artifacts.model.js 
});

const Question = mongoose.model("Question", questionSchema);

export default Question;