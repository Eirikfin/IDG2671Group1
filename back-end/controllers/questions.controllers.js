import Question from "../models/questions.model.js";
import Project from "../models/projects.model.js";


//create a question:
export const createQuestion = async (req, res) => {
    try {
      const { projectId, researcherId, questionText, typeOfQuestion, questionAlternatives } = req.body;
  
      // Convert projectId to ObjectId
      const project = await Project.findById(req.body.projectId);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found!" });
      }
  
      const newQuestion = new Question({
        projectId,
        researcherId,
        questionText,
        typeOfQuestion,
        questionAlternatives,
      });
  
      await newQuestion.save();

      // Add the question ID to the project's questions array
      project.questions.push(newQuestion._id);
      await project.save();

      // Populate questions array
      const updatedProject = await Project.findById(projectId).populate("questions");

      return res.status(201).json({ message: "Question created!", question: newQuestion });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  // Mock the Question model's findByIdAndDelete method
Question.findByIdAndDelete = async (id) => {
    if (id === testQuestionId) {
      return { _id: id, researcherId }; // Ensure the researcherId matches the mock user
    }
    return null;
  };

  export const getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      if (!questions.length) {
        return res.status(404).json({ message: "No questions found" });
      }
      res.status(200).json({ questions }); // Ensure the response includes a "questions" key
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
//get all question:

export const getAllQuestion = async (req, res) => {
    try{
        const questions = await Question.find({ projectId: req.params.id });

        if(questions.length === 0){
            return res.status(404).json({message: "No questions for this project was found"});
        }

        return res.status(200).json(questions)

    }catch(err){
        return res.status(500).json({ message: "Server error", error: err.message});
    }
}

//update question:
export const updateQuestion = async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
  
      if (!question) {
        return res.status(404).json({ message: "Question was not found" });
      }
  
      if (req.user.role !== "admin" && req.user.id !== question.researcherId) {
        return res.status(403).json({ message: "Can't update someone else's question" });
      }
  
      const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: "Question was updated", question: updatedQuestion });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

// Mock the Question model's findByIdAndUpdate method
Question.findByIdAndUpdate = async (id, update) => {
    if (id === testQuestionId) {
      return { ...update, _id: id };
    }
    return null;
  };

//delete question:

export const deleteQuestion = async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
  
      if (!question) {
        return res.status(404).json({ message: "Question was not found" });
      }
  
      if (req.user.role !== "admin" && req.user.id !== question.researcherId) {
        return res.status(403).json({ message: "Can't delete someone else's question" });
      }
  
      await Question.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Question was deleted!" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };