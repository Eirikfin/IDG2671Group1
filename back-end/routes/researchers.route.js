import researcherValidator from "../validators/researcher.validator.js";
import { createResearcher, updateResearcher, findResearcher, deleteResearcher } from "../controllers/researchers.controllers.js";
import { passwordHash } from "../middleware/passwordhandling.js";
import { authenticateToken } from "../middleware/webtoken.js";
import { requireAdmin } from "../middleware/roleauth.js";
import express from "express";

const router = express.Router();

//creating a researcher:
router.post("/", researcherValidator, passwordHash, createResearcher);

//updating a researcher:
router.put("/:id", researcherValidator, authenticateToken, updateResearcher);

//deleting a researcher:
router.delete("/:id", authenticateToken, requireAdmin, deleteResearcher);

//find Researcher info:
router.get("/:id", authenticateToken, requireAdmin, findResearcher);

export default router;