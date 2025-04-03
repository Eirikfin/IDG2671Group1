import express from "express";
import Session from "./models/Session.js";

const router = express.Router();

// POST
router.post("/sessions", async (req, res) => {
    try {
        const newSession = new Session(req.body);
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET all (with pagination, sorting, and filtering)
router.get("/sessions", async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = "startTime", order = "desc", projectId, active } = req.query;
        const filter = {};
        
        if (projectId) {
            filter.projectId = projectId;
        }
        if (active === "true") {
            filter.finishedTime = null;
        } else if (active === "false") {
            filter.finishedTime = { $ne: null };
        }

        const sessions = await Session.find(filter)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Session.countDocuments(filter);

        res.json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            sessions,
        });
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
router.get("/sessions/:id", async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            console.warn(`Session with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Session not found" });
        }
        res.json(session);
    } catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).json({ error: error.message });
    }
});

// Patch
router.put("/sessions/:id", async (req, res) => {
    try {
        const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSession) {
            console.warn(`Session with ID ${req.params.id} not found for update`);
            return res.status(404).json({ message: "Session not found" });
        }
        res.json(updatedSession);
    } catch (error) {
        console.error("Error updating session:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/sessions/:id", async (req, res) => {
    try {
        const deletedSession = await Session.findByIdAndDelete(req.params.id);
        if (!deletedSession) {
            console.warn(`Session with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ message: "Session not found" });
        }
        res.json({ message: "Session deleted successfully" });
    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;