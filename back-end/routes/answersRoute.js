import express from "express";
import Answer from "./models/Answer.js";

const router = express.Router();

// POST
router.post("/answers", async (req, res) => {
    try {
        const newAnswer = new Answer(req.body);
        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch (error) {
        console.error("Error creating answer:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET all (with pagination, sorting, and filtering)
router.get("/answers", async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = "createdAt", order = "desc", questionId, sessionId } = req.query;
        const filter = {};
        
        if (questionId) {
            filter.questionId = questionId;
        }
        if (sessionId) {
            filter.sessionId = sessionId;
        }

        const answers = await Answer.find(filter)
            .populate("questionId sessionId")
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Answer.countDocuments(filter);

        res.json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            answers,
        });
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
router.get("/answers/:id", async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id).populate("questionId sessionId");
        if (!answer) {
            console.warn(`Answer with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Answer not found" });
        }
        res.json(answer);
    } catch (error) {
        console.error("Error fetching answer:", error);
        res.status(500).json({ error: error.message });
    }
});

// Patch
router.put("/answers/:id", async (req, res) => {
    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnswer) {
            console.warn(`Answer with ID ${req.params.id} not found for update`);
            return res.status(404).json({ message: "Answer not found" });
        }
        res.json(updatedAnswer);
    } catch (error) {
        console.error("Error updating answer:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/answers/:id", async (req, res) => {
    try {
        const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);
        if (!deletedAnswer) {
            console.warn(`Answer with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ message: "Answer not found" });
        }
        res.json({ message: "Answer deleted successfully" });
    } catch (error) {
        console.error("Error deleting answer:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;