import express from "express";
import answerValidator from "../validators/answers.validator";

const router = express.Router();

//creating an Answer:
router.post("/", answerValidator, createAnswer);

//updating an Answer:
router.put("/:id", answerValidator, authenticateToken, updateAnswer);

//deleting an Answer:
router.delete("/:id", answerValidator, authenticateToken, deleteAnswer);

//find Answer info:
router.get("/:id", answerValidator, authenticateToken, findAnswer);

export default router;