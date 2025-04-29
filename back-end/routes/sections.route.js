import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import { createSection } from "../controllers/section.controller.js";


const router = express.Router();

router.post("/:projectId", authenticateToken, createSection);


export default router;