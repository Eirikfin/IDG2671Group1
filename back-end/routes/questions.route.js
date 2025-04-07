import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import questionValidator from "../validators/questions.validator.js";
import { createQuestion, updateQuestion, deleteQuestion, getQuestion } from "../controllers/questions.controllers.js";


const router = express.Router();

//creating a Question:
router.post("/", questionValidator, authenticateToken, createQuestion);

//updating a Question:
router.put("/:id", questionValidator, authenticateToken, updateQuestion);

//deleting a Question:
router.delete("/:id", questionValidator, authenticateToken, deleteQuestion);

//find Question info:
router.get("/:id", questionValidator, authenticateToken, getQuestion);

export default router;