import express from "express";
import { authenticateToken } from "../middleware/webtoken.js";
import artifactValidator from "../validators/artifacts.validator.js";
import { createArtifact, updateArtifact, deleteArtifact, getArtifact} from "../controllers/artifacts.controllers.js";
import { getAllArtifacts } from "../controllers/artifacts.controllers.js";

import { uploadFile } from "../middleware/filehandling.js";



const router = express.Router();

// Add a route to fetch all artifacts
router.get("/", authenticateToken, getAllArtifacts);

//creating an artifact:
router.post("/", authenticateToken, uploadFile, createArtifact);

//updating an artifact:
router.put("/:id", artifactValidator, authenticateToken, updateArtifact);

//deleting an artifact:
router.delete("/:id", authenticateToken, deleteArtifact);

//find artifact info:
router.get("/:id", artifactValidator, authenticateToken, getArtifact);

export default router;