import Project from "../models/projects.model.js";
import Question from "../models/questions.model.js";

//creating a new project:
export const createProject = async (req, res) => {
  try {
    const createdProject = {
      researcherId: req.user.id,
      title: req.body.title,
      questions: req.body.questions.questionId,
      status: req.body.status,
    };

    const storeProject = new Project(createdProject);
    await storeProject.save();
    //populates the questions with all question info:
    await storeProject.populate("questions");

    return res
      .status(201)
      .json({ message: "Project Created!", project: storeProject });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// update a project:
export const updateProject = async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    //check if exists:
    if (!foundProject) {
      return res.status(404).json({ message: "Project was not found." });
    }
    //authentication:
    if (req.user.id !== foundProject.researcherId.toString()) {
      return res
        .status(403)
        .json({ message: "Can only update your own projects" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ message: "Project not found after update." });
    }

    await updatedProject.populate("questions");
    return res
      .status(200)
      .json({ message: "Project was updated", project: updatedProject });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

//delete a project:
export const deleteProject = async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);

    if (!foundProject) {
      return res.status(404).json({ message: "No project was found" });
    }
    if (req.user.id !== foundProject.researcherId.toString()) {
      return res
        .status(403)
        .json({ message: "Can't delete other researchers projects" });
    }

    await Question.deleteMany({ projectId: req.params.id });

    await Project.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Project with associated questions, was deleted." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
//get a project:
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "No project/study was found." });
    }

    return res.status(200).json(project);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
//get a researchers projects:
export const getAllProjects = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Can only get your own projects" });
    }
    const foundProjects = await Project.find({ researcherId: req.params.id });
    if (foundProjects.length === 0) {
      return res.status(404).json({ message: "No projects were found " });
    }
    return res.status(200).json(foundProjects);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
