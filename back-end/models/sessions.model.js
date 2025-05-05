import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true }, //refrences project.model.js
  startTime: { type: Date }, //optional, will store time the participant started study/survey
  finishedTime: { type: Date }, //optional, will store the time the participant finished the study/survey
  deviceType: { type: String}, //optional, will store the device type of the participant
  demographics: {
    age: {type: Number},
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    education: { type: String }
  },
  answers: [
    {
      SectionId: {type: mongoose.Schema.Types.ObjectId, ref: "QuestionSection", required: true},
      sectionAnswers: [{type: mongoose.Schema.Types.Mixed}]
  },
]

});

const Session = mongoose.model("Session", sessionSchema);

export default Session;