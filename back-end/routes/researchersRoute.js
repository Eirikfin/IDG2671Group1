import express from "express";
import Researcher from "../models/researchers.model";

const router = express.Router();

// POST
router.post("/researchers", async (req, res) => {
    try {
        const newResearcher = new Researcher(req.body);
        await newResearcher.save();
        res.status(201).json(newResearcher);
    } catch (error) {
        console.error("Error creating researcher:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET all
router.get("/researchers", async (req, res) => {
    try {
        const researchers = await Researcher.find();
        res.json(researchers);
    } catch (error) {
        console.error("Error fetching researchers:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
router.get("/researchers/:id", async (req, res) => {
    try {
        const researcher = await Researcher.findById(req.params.id);
        if (!researcher) {
            console.warn(`Researcher with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Researcher not found" });
        }
        res.json(researcher);
    } catch (error) {
        console.error("Error fetching researcher:", error);
        res.status(500).json({ error: error.message });
    }
});

// Patch
router.put("/researchers/:id", async (req, res) => {
    try {
        const updatedResearcher = await Researcher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResearcher) {
            console.warn(`Researcher with ID ${req.params.id} not found for update`);
            return res.status(404).json({ message: "Researcher not found" });
        }
        res.json(updatedResearcher);
    } catch (error) {
        console.error("Error updating researcher:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/researchers/:id", async (req, res) => {
    try {
        const deletedResearcher = await Researcher.findByIdAndDelete(req.params.id);
        if (!deletedResearcher) {
            console.warn(`Researcher with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ message: "Researcher not found" });
        }
        res.json({ message: "Researcher deleted successfully" });
    } catch (error) {
        console.error("Error deleting researcher:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;