import Question from "../models/questions.model.js";
import Project from "../models/projects.model.js";


//create a question:
export const createQuestion = async (req, res) => {
    try {
      const { projectId, researcherId, questionText, typeOfQuestion, questionAlternatives } = req.body;
  
      // Convert projectId to ObjectId
      const project = await Project.findById(req.params.projectId);
  
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

//get a question:
export const getQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.id)

        if(!question){
            return res.status(404).json({ message: "Question was not found"});
        }

        return res.status(200).json(question)
    }catch(err){
        return res.status(500).json({ message: "Server error", error: err.message});
    }
}

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
    try{
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!question){
            return res.status(404).json({ message: "Question was not found"});
        }

        if(req.user.role !== "admin" && req.user.id !== question.researcherId){
            return res.status(403).json({ message: "Can't update someone elses question"});
        }


        return res.status(200).json({ message: "Question was updated", question: question });
    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
} 

//delete question:

export const deleteQuestion = async (req, res) => {
    try{

        const question = await Question.findByIdAndDelete(req.params.id);
        
        if(!question){
            return res.status(404).json({ message: "Question was not found."});
        }
        if(req.user.id !== question.researcherId){
            return res.status(403).json({ message: "Can't delete someone elses question"});
        }

        const project = await Project.findById(question.projectId);
        if (project) {
            project.questions.pull(question._id);
            await project.save();
        }

        return res.status(200).json({ message: "Question was deleted!"});
    }catch(err){
        return res.status(500).json({ message: "Server error", error: err.message});
    }
}