import researcherValidator from "../validators/researcher.validator.js";
import { createResearcher, updateResearcher, findResearcher, deleteResearcher } from "../controllers/researchers.controllers.js";
import express from "express";


const router = express.Router();

//TO DO: Add authentication for CRUD actions (admin log in)

//creating a researcher: (this route still needs a password hasher)
router.post("/", researcherValidator, createResearcher);

//updating a researcher:
router.put("/:id", researcherValidator, updateResearcher);

//deleting a researcher:
router.delete("/:id", deleteResearcher);

//find Researcher info:
router.get("/:id", findResearcher);

export default router;