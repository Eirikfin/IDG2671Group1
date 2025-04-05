import express from "express";
import { authenticateToken } from "../middleware/webtoken";
import artifactValidator from "../validators/artifacts.validator";
import { createArtifact, updateArtifact, deleteArtifact, findArtifact } from "../controllers/artifacts.controllers";

const router = express.Router();

//creating an artifact:
router.post("/", artifactValidator, authenticateToken, createArtifact);

//updating an artifact:
router.put("/:id", artifactValidator, authenticateToken, updateArtifact);

//deleting an artifact:
router.delete("/:id", artifactValidator, authenticateToken, deleteArtifact);

//find artifact info:
router.get("/:id", artifactValidator, authenticateToken, findArtifact);

export default router;