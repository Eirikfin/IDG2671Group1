import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import sessionValidator from "../validators/sessions.validator.js";
import { createSession, updateSession, deleteSession, getSession, exportCsv } from "../controllers/sessions.controller.js";


const router = express.Router();

//creating a Session:
router.post("/", createSession);

//updating a Session:
router.put("/:id", sessionValidator, authenticateToken, updateSession);

//deleting a Session:
router.delete("/:id", sessionValidator, authenticateToken, deleteSession);

//find Session info:
router.get("/projects/:projectId", authenticateToken, getSession);

router.get("/download/projects/:projectId", authenticateToken, exportCsv)
export default router;