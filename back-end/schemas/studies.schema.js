import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
    StudyID: { type: String, required: true, unique: true}, // Unique ID for the study
    title: { type: String, required: true },                // Study title
    researcherID: { type: Number, required: true },         // ID of the researcher
    description: { type: String },                          // Study description (optional)
    artifactPaths: { type: [String] },                      // List of artifact file paths
    questions: {                                            // List of questions
        type: [mongoose.Schema.Types.Mixed],                // Flexible question structure
        required: true
    },
}, { timestamps: true });                                   // Adds createdAt & updatedAt fields

// Correct model name — changed from "researcherSchema" to "studySchema"
const Study = mongoose.model("Study", studySchema);

export default Study;
