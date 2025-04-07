import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import answerValidator from "../validators/answers.validator.js";
import { createAnswer, updateAnswer, deleteAnswer, getAnswer } from "../controllers/answers.controller.js";

const router = express.Router();

//creating an Answer:
router.post("/", answerValidator, createAnswer);

//updating an Answer:
router.put("/:id", answerValidator, authenticateToken, updateAnswer);

//deleting an Answer:
router.delete("/:id", answerValidator, authenticateToken, deleteAnswer);

//find Answer info:
router.get("/:id", answerValidator, authenticateToken, getAnswer);

export default router;