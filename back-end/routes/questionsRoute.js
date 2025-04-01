import express from "express";
import Question from "../models/questions.model";

const router = express.Router();

// POST
router.post("/questions", async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(400).json({ error: error.message });
    }
});

// GET all (with pagination, sorting, and filtering)
router.get("/questions", async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = "createdAt", order = "desc", typeOfQuestion } = req.query;
        const filter = {};
        
        if (typeOfQuestion) {
            filter.typeOfQuestion = typeOfQuestion;
        }

        const questions = await Question.find(filter)
            .populate("projectID artifacts")
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Question.countDocuments(filter);

        res.json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            questions,
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
router.get("/questions/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate("projectID artifacts");
        if (!question) {
            console.warn(`Question with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(question);
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ error: error.message });
    }
});

// Patch
router.put("/questions/:id", async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            console.warn(`Question with ID ${req.params.id} not found for update`);
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(updatedQuestion);
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/questions/:id", async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            console.warn(`Question with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;