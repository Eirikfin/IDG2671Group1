import mongoose from "mongoose";

export default function answerValidator(req, res, next) {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);
  console.log("Request params:", req.params);

  // Skip validation for DELETE requests
  if (req.method === "DELETE") {
    console.log("Skipping validation for DELETE request");
    return next();
  }

  const { questionId, researcherId, sessionId, answer } = req.body;

  // Validate the required fields for PUT and POST requests
  if (!questionId || !mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(400).json({ message: "Invalid or missing questionId" });
  }
  if (!researcherId || !mongoose.Types.ObjectId.isValid(researcherId)) {
    return res.status(400).json({ message: "Invalid or missing researcherId" });
  }
  if (!sessionId || !mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid or missing sessionId" });
  }
  if (!answer || typeof answer !== "string") {
    return res.status(400).json({ message: "Invalid or missing answer" });
  }

  next();
}