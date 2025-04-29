import QuestionSection from "../models/questionSection.model";
import Project from "../models/projects.model.js"


//upload section:
export const uploadSection = async (req, res) => {
try{    
        const newSection = new QuestionSection(req.body);
        const { projectId, researcherId, artifacts, questions } = req.body

        const project = await Project.findById(projectId);

        if(!project){
            return res.status(404).json({message: "Project not found"});
        }
        if(project.researcherId != researcherId){
            return res.status(403).json({message: "Not correct researcher."});
        }

        await QuestionSection.save();
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

