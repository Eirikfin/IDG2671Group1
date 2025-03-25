import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true},
    startTime: { type: Date },
    finishedTime: { type: Date }
    //add demographics maybe?
})

const Session = mongoose.model("Session", sessionSchema);

export default Session;
