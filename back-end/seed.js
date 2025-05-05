
import mongoose from "mongoose";
import dotenv from "dotenv";
import Artifact from "./models/artifacts.model.js";
import Question from "./models/questions.model.js";
import Project from "./models/projects.model.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    // Clear existing data
    await mongoose.connection.db.dropDatabase();

    // Seed artifacts
    const artifactData = {
      researcherId: new mongoose.Types.ObjectId(),
      filename: "test-file.txt",
      filepath: "/uploads/test-file.txt",
      mediaType: "text",
    };
    await Artifact.create(artifactData);

    // Seed questions
    const questionData = {
      projectId: new mongoose.Types.ObjectId(),
      researcherId: new mongoose.Types.ObjectId(),
      questionText: "What is your favorite color?",
      typeOfQuestion: "MultipleChoice",
      questionAlternatives: ["Red", "Blue", "Green"],
    };
    await Question.create(questionData);

    // Seed projects
    const projectData = {
      researcherId: new mongoose.Types.ObjectId(),
      title: "Test Project",
      summary: "This is a test project.",
      status: "notPublished",
    };
    await Project.create(projectData);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

seedDatabase();