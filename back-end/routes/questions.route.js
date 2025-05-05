import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questions.controllers.js";

const router = express.Router();

// Fetch all questions
router.get("/", authenticateToken, getQuestions);

// Create a question
router.post("/", authenticateToken, createQuestion);

// Update a question
router.put("/:id", authenticateToken, updateQuestion);

// Delete a question
router.delete("/:id", authenticateToken, deleteQuestion);

export default router;