import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import projectValidator from "../validators/projects.validator.js";
import { createProject, updateProject, deleteProject, findProject } from "../controllers/project.controllers";



const router = express.Router();

//creating a project:
router.post("/", projectValidator, authenticateToken, createProject);

//updating a project:
router.put("/:id", projectValidator, authenticateToken, updateProject);

//deleting a project:
router.delete("/:id", projectValidator, authenticateToken, deleteProject);

//find project info:
router.get("/:id", projectValidator, authenticateToken, findProject);

export default router;