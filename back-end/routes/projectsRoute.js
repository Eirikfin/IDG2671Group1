import express from "express";
import Project from "../models/projects.model";

const router = express.Router();

// POST
router.post("/projects", async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error cerating project:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET all (with pagination, filtering, and filtering)
router.get("/projects", async (req, res) => {
    try {
        // Set limit to whatever deemed necessary / most visually appealling later...
        const { page = 1, limit = 5, sortBy = "createdAt", order = "desc", status } = req.query;
        const filter = {};
        
        if (status) {
            filter.status = status;
        }

        const projects = await Project.find(filter)
            .populate("researcher_id questions")
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Project.countDocuments(filter);

        res.json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            projects,
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
router.get("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("researcher_id questions");
        if (!project) {
            console.warn(`Project with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ error: error.message });
    }
});

// Patch
router.put("/projects/:id", async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            console.warn(`Project with ID ${req.params.id} not found for update`);
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(updatedProject);
    } catch (error) {
        console.error("Error updating porject:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/projects/:id", async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            console.warn(`Project with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ message: "Project not found" });
        }
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;