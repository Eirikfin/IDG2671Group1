import express from "express";
import { authenticateToken } from "../middleware/webtoken";
import artifactValidator from "../validators/artifacts.validator";

const router = express.Router();

//creating an artifact:
router.post("/", artifactValidator, authenticateToken, createartifact);

//updating an artifact:
router.put("/:id", artifactValidator, authenticateToken, updateartifact);

//deleting an artifact:
router.delete("/:id", artifactValidator, authenticateToken, deleteartifact);

//find artifact info:
router.get("/:id", artifactValidator, authenticateToken, findartifact);

export default router;