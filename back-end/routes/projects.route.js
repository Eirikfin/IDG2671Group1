import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import projectValidator from "../validators/projects.validator.js";
import { createProject, updateProject, deleteProject, getProject, getAllProjects, publishProject, concludeProject } from "../controllers/project.controllers.js";



const router = express.Router();

//creating a project:
router.post("/", projectValidator, authenticateToken, createProject);

//updating a project:
router.put("/:id", projectValidator, authenticateToken, updateProject);

//deleting a project:
router.delete("/:id", authenticateToken, deleteProject);

//find project info:
router.get("/:id", getProject);

//get all projects for a researcher:
router.get("/researcher/:id", authenticateToken, getAllProjects);

//set a project to active:
router.patch("/:id/activate", authenticateToken, publishProject); 
//set a project to concluded:
router.patch("/:id/conclude", authenticateToken, concludeProject);
export default router;