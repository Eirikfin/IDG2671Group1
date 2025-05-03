import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./testparticipant.json" with { type: "json" }; 

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

// Flexible response schema
const responseSchema = new mongoose.Schema({
  participantId: String,                // Optional participant ID
  studyId: String,                      // Optional study ID
  responses: mongoose.Schema.Types.Mixed, // Mixed type to allow any structure
  answeredAt: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", responseSchema);

// Upload data
const uploadData = async () => {
  await connectDB();

  try {
    const newResponse = new Response({
      participantId: "12345",  // Optional
      studyId: "67890",        // Optional
      responses: data          // Directly save the flexible JSON data
    });

    await newResponse.save();
    console.log("Data uploaded successfully!");
  } catch (err) {
    console.error("Error uploading data:", err);
  } finally {
    mongoose.connection.close();
  }
};

uploadData();