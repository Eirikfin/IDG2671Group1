import express from "express";
import { authenticateToken } from "../middleware/webtoken";

const router = express.Router();

//creating an artifact:
router.post("/",authenticateToken, createartifact);

//updating an artifact:
router.put("/:id", authenticateToken, updateartifact);

//deleting an artifact:
router.delete("/:id", authenticateToken, deleteartifact);

//find artifact info:
router.get("/:id", authenticateToken, findartifact);

export default router;