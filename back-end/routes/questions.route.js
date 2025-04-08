import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import questionValidator from "../validators/questions.validator.js";
import { createQuestion, updateQuestion, deleteQuestion, getQuestion, getAllQuestion } from "../controllers/questions.controllers.js";


const router = express.Router();

//creating a Question:
router.post("/:projectId", questionValidator, authenticateToken, createQuestion);

//updating a Question:
router.put("/:id", questionValidator, authenticateToken, updateQuestion);

//deleting a Question:
router.delete("/:id", questionValidator, authenticateToken, deleteQuestion);

//find Question info:
router.get("/:id", authenticateToken, getQuestion);

//find all Questions for a project:
router.get("/project/:id", authenticateToken, getAllQuestion);

export default router;