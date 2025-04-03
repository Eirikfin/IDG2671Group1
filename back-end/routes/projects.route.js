import express from "express";
import { authenticateToken } from "../middleware/webtoken";


const router = express.Router();

//creating a project:
router.post("/", createproject);

//updating a project:
router.put("/:id", authenticateToken, updateproject);

//deleting a project:
router.delete("/:id", authenticateToken, deleteproject);

//find project info:
router.get("/:id", authenticateToken, findproject);

export default router;