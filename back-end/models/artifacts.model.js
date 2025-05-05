import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema({
  researcherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Researcher",
    required: true,
  },
  filename: { type: String, required: true },
  filepath: { type: String, required: true, unique: true },
  mediaType: {
    type: String,
    required: true,
    enum: ["image", "audio", "video", "text"],
  },
});

const Artifact = mongoose.model("Artifact", artifactSchema);
export default Artifact;
