import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import { createSection, getSection, updateSection, deleteSection } from "../controllers/section.controller.js";
import  questionSectionValidator from "../validators/section.validator.js"

const router = express.Router();

//post a new question section:
router.post("/:projectId", authenticateToken, questionSectionValidator,  createSection);
//get a question section:
router.get("/:id", getSection);
//update Question section:
router.put("/:id", authenticateToken, questionSectionValidator, updateSection);
//delete a section:
router.delete(":id", authenticateToken, deleteSection);

export default router;