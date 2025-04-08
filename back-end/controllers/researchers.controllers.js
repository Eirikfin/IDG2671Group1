import Researcher from "../models/researchers.model.js";
import bcrypt from "bcrypt";

//creating  a new researcher:
export const createResearcher = async (req, res) => {
  try {
    const newResearcher = new Researcher(req.body);
    await newResearcher.save();
    return res.status(201).json({
      message: "New Researcher created sucessfully",
      researcher: newResearcher,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//updating a researcher:
export const updateResearcher = async (req, res) => {
  try {
    // Compare token ID with request parameter
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own profile." });
    }

    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password
      const saltRounds = 10; // Adjust salt rounds as needed
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    // Use findById to fetch the researcher and update fields manually
    const researcherToUpdate = await Researcher.findById(req.params.id);
    if (!researcherToUpdate) {
      return res.status(404).json({ message: "Researcher ID not found" });
    }

    // Update the fields manually
    Object.assign(researcherToUpdate, req.body);

    // Save the updated researcher (this triggers Mongoose middleware if any)
    const updatedResearcher = await researcherToUpdate.save();

    return res.status(200).json({
      message: "Researcher has been updated successfully",
      researcher: updatedResearcher,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//deleting a researcher:
export const deleteResearcher = async (req, res) => {
  try {
    const researcherToDelete = await Researcher.findById(req.params.id);
    if (!researcherToDelete) {
      return res.status(404).json({ message: "Researcher not found." });
    }

    // Allow admins to delete any researcher, but restrict others to their own profile
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "You can only delete your own profile." });
    }

    await Researcher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Researcher deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting researcher.", error: err.message });
  }
};

//getting a researchers info:
export const getResearcher = async (req, res) => {
  try {
    const foundResearcher = await Researcher.findById(req.params.id);

    if (!foundResearcher) {
      return res
        .status(404)
        .json({ message: "No researcher with this id was found" });
    }
    const result = {
      email: foundResearcher.email,
      name: foundResearcher.name,
    };
    return res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

//getting all researchers info
export const getAllResearchers = async (req, res) => {
  try {
    // TODO: add req.param for superuser token
    const allResearchers = await Researcher.find();
    if (allResearchers.length === 0) {
      return res.status(404).json({ message: "No researchers was found" });
    }
    const result = allResearchers.map((researcher) => ({
      id: researcher._id,
      name: researcher.name,
      email: researcher.email,
    }));
    res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};