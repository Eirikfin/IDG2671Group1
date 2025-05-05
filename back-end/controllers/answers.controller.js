import Answer from "../models/answers.model.js";

// POST
export const createAnswer = async (req, res) => {
    try {
        const newAnswer = new Answer(req.body);
        await newAnswer.save();
        return res.status(201).json({
            message: "Answer submission successful",
            answer: newAnswer,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error", error: err.message
        });
    }
};

// GET (get all answers, don't need to get specific answers)
export const getAnswer = async (req, res) => {
    try {
        const allAnswers = await Answer.find({ questionId: req.params.questionId });
        if (allAnswers.length === 0) {
        return res.status(404).json({ message: "No Answers was found" });
        }
        const result = {
            id: allAnswers._id,
            name: allAnswers.name,
            email: allAnswers.email,
        };
        res.status(200).json(result);
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
};

// filepath: /Users/hannasamborska/Documents/GitHub/IDG2671Group1/back-end/controllers/answers.controller.js

export const updateAnswer = async (req, res) => {
    try {
      console.log("Update request body:", req.body);
      console.log("Update request params:", req.params);
  
      // Debug: Check if the answer exists before updating
      const existingAnswer = await Answer.findById(req.params.id);
      if (!existingAnswer) {
        console.log("Update failed: Answer ID not found in database");
        return res.status(404).json({ message: "Answer ID not found" });
      }
  
      const updatedAnswer = await Answer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAnswer) {
        console.log("Update failed: Answer ID not found after update");
        return res.status(404).json({ message: "Answer ID not found" });
      }
      return res.status(200).json({
        message: "Answer has been updated successfully",
        answer: updatedAnswer,
      });
    } catch (err) {
      console.error("Error in updateAnswer:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  export const deleteAnswer = async (req, res) => {
    try {
      console.log("Delete request params:", req.params);
  
      const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);
      if (!deletedAnswer) {
        return res.status(404).json({ message: "Answer ID not found" });
      }
      return res.status(200).json({ message: "Answer was deleted successfully" });
    } catch (err) {
      console.error("Error in deleteAnswer:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };