import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    researcher_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Researcher"},
    title: {type: String, required: true},
    questions: [{questionId: {type: mongoose.Schema.Types.ObjectId, ref: "Question"}}],
    status: {
        type: String,
        required: true,
        enum: ["notPublished", "active", "concluded"]
    }
})

const Project = mongoose.model("Project", projectSchema)
export default Project;