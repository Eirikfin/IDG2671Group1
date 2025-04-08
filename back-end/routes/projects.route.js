import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import projectValidator from "../validators/projects.validator.js";
import { createProject, updateProject, deleteProject, getProject } from "../controllers/project.controllers.js";



const router = express.Router();

//creating a project:
router.post("/", projectValidator, authenticateToken, createProject);

//updating a project:
router.put("/:id", projectValidator, authenticateToken, updateProject);

//deleting a project:
router.delete("/:id", projectValidator, authenticateToken, deleteProject);

//find project info:
router.get("/:id", authenticateToken, getProject);

export default router;