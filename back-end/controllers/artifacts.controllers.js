import Artifact from "../models/artifacts.model.js";

//storing uploaded artifact in db:
export const createArtifact = async (req, res) => {
  try {
    //check if file was uploaded:
    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded" });
    }
    //preparing object to be stored in database:
    const uploadedArtifact = {
      researcherId: req.user.id,
      filename: req.file.filename,
      filepath: req.file.filepath,
      mediaType: req.file.mediaType,
    };
    //saving to database
    const addedArtifact = new Artifact(uploadedArtifact);
    await addedArtifact.save();

    //return success message + artifactinfo stored:
    return res.status(201).json({
      message: "Artifact uploaded successfully!",
      artifact: addedArtifact,
    });
  } catch (err) {
    //if upload fails send server error:
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};
export const updateArtifact = async (req, res) => {
  try {
    const foundArtifact = await Artifact.findById(req.params.id);

    // If no artifact found:
    if (!foundArtifact) {
      return res
        .status(404)
        .json({ message: "No artifact with this ID was found" });
    }

    // Check if the artifact belongs to the authenticated researcher
    if (req.user.id !== foundArtifact.researcherId.toString()) {
      return res
        .status(403)
        .json({ message: "Can't update other researchers' artifacts!" });
    }

    // Update the artifact
    const updatedArtifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    //success response:
    return res.status(200).json({
      message: "Artifact was successfully updated!",
      artifact: updatedArtifact,
    });
  } catch (err) {
    //error response:
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

//deleting an artifact:
export const deleteArtifact = async (req, res) => {
  try {
    //find artifact in db:
    const foundArtifact = await Artifact.findById(req.params.id);
    //if no artifact was found:
    if (!foundArtifact) {
      return res
        .status(404)
        .json({ message: "No artifact with this Id was found" });
    }
    //if authorization don't match artifact:
    if (req.user.id !== foundArtifact.researcherId.toString()) {
      return res
        .status(403)
        .json({ message: "Can't delete other researchers Artifacts!" });
    }
    const deletedArtifact = await Artifact.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Artifact was deleted", artifact: deletedArtifact });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
//getting an artifact by id:
export const getArtifact = async (req, res) => {
  try {
    const foundArtifact = await Artifact.findById(req.params.id);
    if (!foundArtifact) {
      return res.status(404).json({ message: "No Artifact was found" });
    }

    return res.status(200).json(foundArtifact);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

//getting all artifacts uploaded by a researcer
export const getAllArtifacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc", mediaType, researcherId } = req.query;
    const filter = {};
    
    if (mediaType) {
        filter.mediaType = mediaType;
    }
    if (researcherId) {
        filter.researcherId = researcherId;
    }

    const artifacts = await Artifact.find(filter)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Artifact.countDocuments(filter);

    res.status(200).json({
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        artifacts,
    });
} catch (error) {
    console.error("Error fetching artifacts:", error);
    res.status(500).json({ error: error.message });
}
};
