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

// Patch
export const updateAnswer = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res
              .status(403)
              .json({ message: "You can only update answers from your own questions." });
          }
      
          const updatedAnswer = await Answer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
      
          if (!updatedAnswer) {
            return res.status(404).json({ message: "Answer ID not found" });
          }
      
          return res.status(200).json({
            message: "Answer has been updated sucessfully",
            Answer: updatedAnswer,
          });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    };
};

// Delete
export const deleteAnswer = async (req, res) => {
    try {
        //compare tokenid with request parameter
        if (req.user.id !== req.params.id) {
            return res
            .status(403)
            .json({ message: "You can only delete answers from your own questions." });
        }
    
        const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);
    
        if (!deletedAnswer) {
            return res.status(404).json({ message: "Answer ID not found" });
        }
        return res.status(200).json({
            message: "Answer has been deleted sucessfully",
            Answer: deletedAnswer,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};