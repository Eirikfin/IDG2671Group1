import Project from "../models/projects.model.js";
import Question from "../models/questions.model.js";

//creating a new project:
export const createProject = async (req, res) => {
  try {
    const createdProject = {
      researcherId: req.user.id,
      title: req.body.title,
      description: req.body.description, // Ensure description is included
      questions: [],
      status: req.body.status,
    };

    const storeProject = new Project(createdProject);
    await storeProject.save();
    //populates the questions with all question info:
    await storeProject.populate("questions");
   

    return res
      .status(201)
      .json(storeProject);
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
    const project = await Project.findById(req.params.id).populate("questions");

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
    // Set limit to whatever deemed necessary / most visually appealling later...
    const { page = 1, limit = 5, sortBy = "createdAt", order = "desc", status } = req.query;
    const filter = {};
    
    if (status) {
        filter.status = status;
    }

    const projects = await Project.find(filter)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Project.countDocuments(filter);

    res.status(200).json({
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        projects,
    });
} catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error.message });
}
}

export const publishProject = async (req, res) => {
  try{
    const project = await Project.findByIdAndUpdate(req.params.id, {
      status: "active"
    },
    { new: true }
  );
    if(!project){
      return res.status(404).json({message: "Project not found"});
    }

    return res.status(200).json(project);
  }catch(err){
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const concludeProject = async (req, res) => {
  try{
    const project = await Project.findByIdAndUpdate(req.params.id, {
      status: "concluded"
    },
    { new: true }
  );

  if(!project){
    return res.status(404).json({message: "Project not found"});
  }

  return res.status(200).json(project);
  }catch(err){
    return res.status(500).json({ message: "Sever error", error: err.message });
  }
}