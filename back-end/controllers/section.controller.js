import QuestionSection from "../models/questionSection.model.js";
import Project from "../models/projects.model.js"


//upload section:
export const createSection = async (req, res) => {
try{    
        
        const { projectId, artifacts, questions } = req.body

        const newSection = new QuestionSection({
            projectId: req.params.projectId,
            researcherId: req.user.id,
            artifacts,
            questions
    });
        const project = await Project.findById(req.params.projectId);

        if(!project){
            return res.status(404).json({message: "Project not found"});
        }
        if(project.researcherId != req.user.id){
            return res.status(403).json({message: "Not correct researcher."});
        }

        await newSection.save();

        await project.questions.push(newSection._id)
       
        await project.save();

        return res.status(201).json(newSection);
}catch(err){
    return res.status(500).json({message: "Server error", error: err.message});
}}



export const getSection = async (req, res) => {
    return res.send("Not implemented")
}

export const updateSection = async (req, res) => {
    return
}

export const deleteSection = async (req, res) => {
    return
}

