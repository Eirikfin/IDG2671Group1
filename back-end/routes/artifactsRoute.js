import express from "express";
import Artifact from "./models/Artifact.js";

const router = express.Router();

// POST
router.post("/artifacts", async (req, res) => {
    try {
        const newArtifact = new Artifact(req.body);
        await newArtifact.save();
        res.status(201).json(newArtifact);
    } catch (error) {
        console.error("Error creating artifact:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET all (with pagination, sorting, and filtering)
router.get("/artifacts", async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = "createdAt", order = "desc", mediaType, researcherId } = req.query;
        const filter = {};
        
        if (mediaType) {
            filter.mediaType = mediaType;
        }
        if (researcherId) {
            filter.researcherId = researcherId;
        }

        const artifacts = await Artifact.find(filter)
            .populate("researcherId")
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Artifact.countDocuments(filter);

        res.json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            artifacts,
        });
    } catch (error) {
        console.error("Error fetching artifacts:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
router.get("/artifacts/:id", async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id).populate("researcherId");
        if (!artifact) {
            console.warn(`Artifact with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Artifact not found" });
        }
        res.json(artifact);
    } catch (error) {
        console.error("Error fetching artifact:", error);
        res.status(500).json({ error: error.message });
    }
});

// Patch
router.put("/artifacts/:id", async (req, res) => {
    try {
        const updatedArtifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArtifact) {
            console.warn(`Artifact with ID ${req.params.id} not found for update`);
            return res.status(404).json({ message: "Artifact not found" });
        }
        res.json(updatedArtifact);
    } catch (error) {
        console.error("Error updating artifact:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/artifacts/:id", async (req, res) => {
    try {
        const deletedArtifact = await Artifact.findByIdAndDelete(req.params.id);
        if (!deletedArtifact) {
            console.warn(`Artifact with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ message: "Artifact not found" });
        }
        res.json({ message: "Artifact deleted successfully" });
    } catch (error) {
        console.error("Error deleting artifact:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;