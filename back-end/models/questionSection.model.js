import mongoose from "mongoose";


const sectionSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    researcherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Researcher",
        required: true},

    artifacts: [
        { artifactId: { type: mongoose.Schema.Types.ObjectId, ref: "Artifact" } },
    ],
    questions: [
        {questionType: {
            type: String,
            required: true,
            //type of question asked, will decide participant answer datatype
            enum: ["TextInput", "MultipleChoice", "SlidingScale"], 
        },
        questionText: { type: String, required: true},
        questionAlternatives: [{ type: String }], //Optional: if multiple choice, answer alternatives will be stored here
    }],

})

const QuestionSection = mongoose.model("QuestionSection", sectionSchema);

export default QuestionSection;
