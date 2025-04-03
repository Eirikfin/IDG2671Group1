import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true }, //refrences project.model.js
  startTime: { type: Date }, //optional, will store time the participant started study/survey
  finishedTime: { type: Date }, //optional, will store the time the participant finished the study/survey
  // add demographics
  // add device-type
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;