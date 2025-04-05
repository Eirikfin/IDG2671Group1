import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import projectValidator from "../validators/projects.validator.js";


const router = express.Router();

//creating a project:
router.post("/", projectValidator, authenticateToken, createproject);

//updating a project:
router.put("/:id", projectValidator, authenticateToken, updateproject);

//deleting a project:
router.delete("/:id", projectValidator, authenticateToken, deleteproject);

//find project info:
router.get("/:id", projectValidator, authenticateToken, findproject);

export default router;