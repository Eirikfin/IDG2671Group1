import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import answerValidator from "../validators/answers.validator.js";
import { createAnswer, updateAnswer, deleteAnswer, getAnswer } from "../controllers/answers.controller.js";
import Answer from "../models/answers.model.js";

const router = express.Router();

// Add this route to fetch all answers
router.get("/", authenticateToken, async (req, res) => {
  try {
    const answers = await Answer.find();
    if (!answers.length) {
      return res.status(404).json({ message: "No answers found" });
    }
    res.status(200).json({ answers });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Creating an Answer
router.post("/", answerValidator, createAnswer);

// Updating an Answer
router.put("/:id", answerValidator, authenticateToken, updateAnswer);

// Deleting an Answer
router.delete("/:id", answerValidator, authenticateToken, deleteAnswer);

// Finding Answer Info
router.get("/:id", answerValidator, authenticateToken, getAnswer);

export default router;