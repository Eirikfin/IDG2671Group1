import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true }, //refrences project.model.js
  researcherId: { type: mongoose.Schema.Types.ObjectId }, // needed for CRUD REQUESTS
  startTime: { type: Date }, //optional, will store time the participant started study/survey
  finishedTime: { type: Date }, //optional, will store the time the participant finished the study/survey
  deviceType: { type: String, required: true }, //optional, will store the device type of the participant
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;