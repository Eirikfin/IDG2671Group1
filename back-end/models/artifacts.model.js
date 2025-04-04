import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema({
  researcherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Researcher",
    required: true,
  }, //refrences researchers.model.js
  filename: { type: String, required: true }, //original name of file
  filepath: { type: String, required: true, unique: true }, //unique path to file stored on server
  mediaType: {
    type: String,
    required: true,
    enum: ["image", "audio", "video", "text"], //media type of artifact
  },
});

const Artifact = mongoose.model("Artifact", artifactSchema);
export default Artifact;
