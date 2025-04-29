import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import artifactValidator from "../validators/artifacts.validator.js";
import { createArtifact, updateArtifact, deleteArtifact, getArtifact } from "../controllers/artifacts.controllers.js";

import { uploadFile } from "../middleware/filehandling.js";



const router = express.Router();

//creating an artifact:
router.post("/", authenticateToken, uploadFile, createArtifact);

//updating an artifact:
router.put("/:id", artifactValidator, authenticateToken, updateArtifact);

//deleting an artifact:
router.delete("/:id", artifactValidator, authenticateToken, deleteArtifact);

//find artifact info:
router.get("/:id", artifactValidator, authenticateToken, getArtifact);

export default router;