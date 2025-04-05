import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import sessionValidator from "../validators/sessions.validator.js";

const router = express.Router();

//creating a Session:
router.post("/", sessionValidator, createSession);

//updating a Session:
router.put("/:id", sessionValidator, authenticateToken, updateSession);

//deleting a Session:
router.delete("/:id", sessionValidator, authenticateToken, deleteSession);

//find Session info:
router.get("/:id", sessionValidator, authenticateToken, findSession);

export default router;