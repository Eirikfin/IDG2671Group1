import express from "express";
import { authenticateToken } from "../middleware/webtoken";
import questionValidator from "../validators/questions.validator";
import { createQuestion, updateQuestion, deleteQuestion, findQuestion } from "../controllers/questions.controllers";

const router = express.Router();

//creating a Question:
router.post("/", questionValidator, authenticateToken, createQuestion);

//updating a Question:
router.put("/:id", questionValidator, authenticateToken, updateQuestion);

//deleting a Question:
router.delete("/:id", questionValidator, authenticateToken, deleteQuestion);

//find Question info:
router.get("/:id", questionValidator, authenticateToken, findQuestion);

export default router;